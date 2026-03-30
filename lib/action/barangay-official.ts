"use server";
import { ResidentTableType } from "@/components/columns";
import { createClient } from "../supabase/server";
import {
  BarangayOfficial,
  POSITION_LIMITS,
  ResidentList,
  RowOfficial,
} from "../types/barangay-official.type";
import {
  officialSchema,
  OfficialType,
} from "../schema/barangay-official.validation";
import { cacheTag, revalidateTag } from "next/cache";

export const getResidentList = async (): Promise<ResidentList[]> => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("resident")
    .select(`id,last_name,first_name,suffix,middle_name`);

  if (error) {
    console.error(error.message);
    throw new Error(error.message || "Failed to fetch the resident");
  }

  return data;
};

export const formattedName = async (
  data: ResidentList[],
): Promise<Pick<ResidentTableType, "id" | "fullName">[]> => {
  "use cache"
  cacheTag("officials");
  return data.map((resident: ResidentList) => ({
    id: String(resident.id),
    fullName: [
      resident.first_name,
      resident.middle_name
        ? resident.middle_name.charAt(0).toUpperCase() + "."
        : "",
      resident.last_name,
      resident.suffix ?? "",
    ]
      .filter(Boolean)
      .join(" "),
  }));
};

export const fetchResidentList = async (): Promise<
  Pick<ResidentTableType, "id" | "fullName">[]
> => {
  const data = await getResidentList();

  return formattedName(data);
};

function formatDateOnly(date: Date): string {
  return date.toISOString().split("T")[0];
}

export async function addBarangayOfficial(data: OfficialType) {
  const supabase = await createClient();
  const parsed = officialSchema.safeParse(data);
  if (!parsed.success) {
    return {
      success: false,
      error:
        parsed.error.issues[0]?.message ??
        "Invalid form data. Please check required fields.",
    };
  }

  const {
    date_of_election,
    term_start,
    official_name,
    position,
    honorarium,
    beneficiaries,
  } = parsed.data;

  // SK Secretary and SK Treasurer must be an SK Member
  const SK_OFFICER_POSITIONS = ["SK Secretary", "SK Treasurer"];

  // 1. Check position limit
  const limit = POSITION_LIMITS[position];
  if (!limit) {
    return { success: false, error: `Unknown position: ${position}` };
  }

  const { count, error: countError } = await supabase
    .from("barangay_officials")
    .select("id", { count: "exact", head: true })
    .eq("position", position)
    .eq("status", "active");

  if (countError) {
    return {
      success: false,
      error: countError.message ?? "Failed to check position count.",
    };
  }

  if ((count ?? 0) >= limit) {
    return {
      success: false,
      error: `Position "${position}" has already reached the maximum limit of ${limit}.`,
    };
  }

  // 2. If SK Secretary or SK Treasurer, must be an existing active SK Member
  if (SK_OFFICER_POSITIONS.includes(position)) {
    const { data: isSKMember, error: skError } = await supabase
      .from("barangay_officials")
      .select("id")
      .eq("barangay_official", official_name)
      .eq("position", "SK Member")
      .eq("status", "active")
      .maybeSingle();

    if (skError) {
      return {
        success: false,
        error: skError.message ?? "Failed to verify SK Member status.",
      };
    }

    if (!isSKMember) {
      return {
        success: false,
        error: `"${official_name}" must be an active SK Member to be assigned as ${position}.`,
      };
    }
  }

  const termStartDate = term_start;
  const termEndDate = new Date(termStartDate);
  termEndDate.setFullYear(termEndDate.getFullYear() + 3);

  // Insert into barangay_officials (trigger auto-creates barangay_beneficiaries row)
  const { data: officialInfo, error: officialInfoError } = await supabase
    .from("barangay_officials")
    .insert({
      barangay_official: official_name,
      position,
      date_of_election: formatDateOnly(date_of_election),
      term_start: formatDateOnly(termStartDate),
      term_end: formatDateOnly(termEndDate),
      honorarium,
    })
    .select("id")
    .single();

  if (officialInfoError) {
    console.error("officialInfoError:", officialInfoError);
    return {
      success: false,
      error: officialInfoError.message ?? "Failed to save official info.",
    };
  }

  //Insert additional beneficiaries if provided
  if (beneficiaries && beneficiaries.length > 0) {
    const beneficiariesPayload = beneficiaries
      .filter((b) => b.name?.trim() && b.relationship?.trim())
      .map((b) => ({
        barangay_official_id: officialInfo.id,
        resident_id: b.name,
        relationship: b.relationship,
      }));

    if (beneficiariesPayload.length > 0) {
      const { error: beneficiariesError } = await supabase
        .from("barangay_official_beneficiaries")
        .upsert(beneficiariesPayload);

      if (beneficiariesError) {
        console.error("beneficiariesError:", beneficiariesError);
        return {
          success: false,
          error: beneficiariesError.message ?? "Failed to save beneficiaries.",
        };
      }
    }
  }
  revalidateTag("officials", "max");
  return { success: true };
}

export const getOfficials = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("barangay_officials")
    .select(
      "barangay_official,position,resident!inner(id,last_name,first_name,middle_name,suffix)",
    )
    .eq("status", "active");

  if (error) {
    console.error(error.message);
    throw new Error(error.message || "Failed to fetch barangay officials!");
  }

  return data;
};

export const filteredNameJoin = async (
  data: RowOfficial[],
): Promise<BarangayOfficial[]> => {
  "use cache";
  cacheTag("officials");

  return data.flatMap((official) => {
    const resident = (
      Array.isArray(official.resident)
        ? official.resident[0]
        : official.resident
    ) as ResidentList | null;

    if (!resident) return [];

    const fullname = [
      resident.first_name,
      resident.middle_name
        ? resident.middle_name.charAt(0).toUpperCase() + "."
        : "",
      resident.last_name,
      resident.suffix ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return [{ position: official.position, fullname }]; // ✅ one object
  });
};

export const getOfficialName = async (): Promise<BarangayOfficial[]> => {
  const data = await getOfficials();

  return filteredNameJoin(data);
};
