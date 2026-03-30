import z from "zod";

export const POSITION_WITH_BENEFICIARIES = [
  "Punong Barangay",
  "Kagawad",
  "SK Chairperson",
  "SK Member",
  "Barangay Secretary",
  "Barangay Treasurer",
] as const;

const coercePastOrTodayDate = (fieldLabel: string) =>
  z
    .preprocess((val) => {
      if (val instanceof Date) return val;
      if (typeof val === "string" || typeof val === "number") return new Date(val);
      return val;
    }, z.date({ error: `${fieldLabel} is required` }))
    .refine((date) => date <= new Date(), {
      message: "Date cannot be in the future",
    });

export const officialSchema = z.object({
  date_of_election: coercePastOrTodayDate("Date of election"),
  term_start: coercePastOrTodayDate("Date of assumption"),
  official_name: z
    .string({ error: "Full name is required" })
    .min(1, "Full name is required"),
  position: z
    .string()
    .refine((val) => val !== "", { message: "Position is required" }),
  honorarium: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ error: "Honorarium is required" })
      .min(0, { message: "Honorarium must be positive" }),
  ),
  beneficiaries: z.array(
    z.object({
      name: z.string().min(1, "Please select a beneficiary"),
      relationship: z.string().min(1, "Relationship is required"),
    }),
  ).default([]),
}).superRefine((val, ctx) => {
  const requiresBeneficiaries = POSITION_WITH_BENEFICIARIES.includes(
    val.position as (typeof POSITION_WITH_BENEFICIARIES)[number],
  );

  if (!requiresBeneficiaries) return;

  if (!val.beneficiaries || val.beneficiaries.length === 0) {
    ctx.addIssue({
      code: "custom",
      path: ["beneficiaries"],
      message: "At least one beneficiary is required",
    });
  }
});

export type OfficialType = z.infer<typeof officialSchema>;

export const officialDefaultValue = {
  date_of_election: undefined,
  term_start: undefined,
  official_name: "",
  position: "",
  honorarium: "" as any,
  beneficiaries: [] as { name: string; relationship: string }[],
};
