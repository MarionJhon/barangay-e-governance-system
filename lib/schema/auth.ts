import z from "zod";

export const signInSchema = z.object({
  email: z.email({
    pattern: z.regexes.rfc5322Email,
    error: "Email is required",
  }),
  password: z.string().min(1, "Passord is Required"),
});

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 character")
  .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
  .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
  .regex(/[0-9]/, "Passwod must  contain at least 1 number")
  .regex(
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]/,
    "Password must contain at least one special character",
  );

export const signUpSchema = z.object({
  password: passwordSchema,
});

export type SignUpType = z.infer<typeof signUpSchema>;
export type SignInType = z.infer<typeof signInSchema>;
