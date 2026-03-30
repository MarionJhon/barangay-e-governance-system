import z from "zod";

export const residentSchema = z.object({
  last_name: z
    .string()
    .min(2, { error: "Last name is required" })
    .max(50, { error: "Last name is too long" }),
  first_name: z
    .string()
    .min(2, "First name is required")
    .max(50, "First name is too long"),
  suffix: z.string().optional(),
  middle_name: z.string().optional(),
  date_of_birth: z
    .date({ error: "Date of birth is required" })
    .refine((date) => date <= new Date(), {
      error: "Date cannot be in the future",
    }),
  birth_place: z
    .string()
    .min(2, "Birth place is required")
    .max(100, "Birth place is too long"),
  sex_at_birth: z
    .string({ error: "Gender is required" })
    .refine((val) => val !== "", { error: "Gender is required" })
    .refine((val) => ["Male", "Female"].includes(val), {
      error: "Invalid value",
    }),
  civil_status: z
    .string()
    .refine((val) => val !== "", { error: "Civil status is required" }),
  citizenship: z
    .string()
    .min(2, "Citizenship is required")
    .max(50, "Citizenship is too long"),
  religion: z.string().optional(),
  contact_number: z
    .string()
    .min(10, "Contact number is too short")
    .max(13, "Contact number is too long")
    .regex(/^(09\d{9}|\+639\d{9})$/, "Invalid PH mobile number"),
  email_address: z
    .string()
    .optional()
    .refine((val) => !val || z.email().safeParse(val).success, {
      error: "Invalid Email Address",
    }),
  occupation: z
    .string()
    .min(2, "Occupation is required")
    .max(50, "Occupation is required"),
  employment_status: z
    .string()
    .refine((val) => val !== "", { error: "Employment status is required" }),
  monthly_income: z.preprocess(
    (val) => (val === "" ? undefined : Number(val)),
    z
      .number({ error: "Monthly income is required" })
      .min(0, { message: "Monthly income must be positive" })
  ),
  educational_attainment: z.string().refine((val) => val !== "", {
    error: "Educational attainment is required",
  }),

  house_no: z.string().optional(),
  street_name: z.string().optional(),
  purok: z.string().refine((val) => val !== "", { error: "Purok is required" }),

  resident_status: z
    .string()
    .refine((val) => val !== "", { error: "Resident status is required" }),
});

export const residentDefaultValue = {
  last_name: "",
  first_name: "",
  suffix: "",
  middle_name: "",
  birth_place: "",
  citizenship: "",
  religion: "",
  contact_number: "",
  email_address: "",
  occupation: "",
  monthly_income: "" as any,
  house_no: "",
  street_name: "",
  resident_status: "Permanent Resident",
  date_of_birth: undefined,
  sex_at_birth: "",
  civil_status: "",
  employment_status: "",
  educational_attainment: "",
  purok: "",
};
