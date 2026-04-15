"use server";
import { cacheTag, revalidateTag } from "next/cache";
import { createClient } from "../supabase/server";
import { ResidentSource, ResidentType } from "../types/custodian-of-records";
import { ResidentTableType } from "@/components/columns";

export const addResidentInfo = async (residentInfo: ResidentType) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "User not authenticated." };
  }

  const { error } = await supabase
    .from("resident")
    .insert({
      ...residentInfo,
      date_of_birth: residentInfo.date_of_birth
        ? residentInfo.date_of_birth.toISOString().split("T")[0]
        : null,
    })
    .select()
    .single();

  if (error) {
    console.log(error);
    return { success: false, error: error.message };
  }
  revalidateTag("resident", "max");
  return { success: true };
};

export const getResident = async (): Promise<ResidentSource[]> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated.");
  }

  const { data, error } = await supabase
    .from("resident")
    .select(
      `
      id,
      last_name,
      first_name,
      middle_name,
      suffix,
      sex_at_birth,
      purok,
      resident_status
    `,
    )
    .order("last_name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

const mapResident = (data: ResidentSource[]): ResidentTableType[] => {
  return data.map((item: ResidentSource) => ({
    id: String(item.id),
    fullName: [
      `${item.last_name},`,
      item.first_name,
      item.middle_name ? item.middle_name.charAt(0).toUpperCase() + "." : "",
      item.suffix ?? "",
    ]
      .filter(Boolean)
      .join(" "),
    sex: item.sex_at_birth,
    purok: item.purok,
    status: item.resident_status,
  }));
};

export const fetchResident = async (): Promise<ResidentTableType[]> => {
  const data = await getResident();

  return mapResident(data);
};

export const updateResident = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user) {
    return {success: false, error: "User not authenticated."}
  }

  

};

export const deleteResident = async (id: string) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "User not authenticated." };
  }

  const { error } = await supabase.from("resident").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidateTag("resident", "max");

  return { error: null };
};
