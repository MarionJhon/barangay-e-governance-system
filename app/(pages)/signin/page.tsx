"use client";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { signInSchema, SignInType } from "@/lib/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

const SignIn = () => {
  const { loading, signIn } = useAuth();
  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();

  async function handleSignIn(formValue: SignInType) {
    try {
      const result = await signIn(formValue);

      if (!result.success) {
        console.error(result?.error);
        toast.error(result?.error ?? "Something went wrong", {
          position: "top-right",
        });
      } else {
        form.reset();
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Unexpeced error", error);
    }
  }
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-teal-100 to-sky-100 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center p-4 py-8">
        <div className="bg-white shadow-lg w-full max-w-5xl mx-auto rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="hidden md:flex items-center justify-center py-16 bg-emerald-700 rounded-tl-2xl rounded-bl-2xl">
              <Image
                src="/welcome.svg"
                alt="barangay image"
                width={500}
                height={0}
              />
            </div>
            <div className="p-6 sm:p-10 md:p-12 flex flex-col justify-center">
              <div className="flex flex-col items-center gap-2 mb-8">
                <Image
                  src="/logo.png"
                  alt="logo image"
                  width={100}
                  height={100}
                />
                <h1 className="text-xl sm:text-xl md:text-2xl font-semibold text-center">
                  Barangay eGovernment System
                </h1>
              </div>
              <div className="mb-6">
                <h1 className="text-xl sm:text-2xl font-semibold">
                  Login to your account
                </h1>
                <p className="text-muted-foreground text-sm mt-1">
                  Enter your email below to login to your account
                </p>
              </div>
              <form onSubmit={form.handleSubmit(handleSignIn)} id="signin">
                <FieldGroup>
                  <Controller
                    name="email"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="email" className="text-md">
                          Email
                        </FieldLabel>
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          placeholder="johndoe@gmail.com"
                          className="h-12 border-2"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]}></FieldError>
                        )}
                      </Field>
                    )}
                  />
                  <Controller
                    name="password"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field>
                        <FieldLabel htmlFor="email" className="text-md">
                          Password
                        </FieldLabel>
                        <Input
                          {...field}
                          type="password"
                          aria-invalid={fieldState.invalid}
                          className="h-12 border-2"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]}></FieldError>
                        )}
                      </Field>
                    )}
                  />
                </FieldGroup>
                <div className="mt-8">
                  <Button
                    type="submit"
                    form="signin"
                    className="w-full h-12 text-base md:text-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner />
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
