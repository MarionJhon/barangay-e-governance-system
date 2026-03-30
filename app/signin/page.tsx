import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const SignIn = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-teal-100 to-sky-100 flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        <div className="container bg-white shadow-lg mx-auto px-3 py-3">
          <div className="grid grid-cols-2 auto-rows-min gap-4">
            <div className="flex items-center justify-center py-16 bg-emerald-700 rounded-2xl">
              <Image
                src="/welcome.svg"
                alt="barangay image"
                width={500}
                height={0}
              />
            </div>
            <div className="rounded-2xl p-4">
              <div className="flex flex-col items-center justify-center gap-2">
                <Image
                  src="/logo.png"
                  alt="logo image"
                  width={100}
                  height={0}
                />
                <h1 className="text-2xl font-semibold">
                  Barangay eGovernment System
                </h1>
              </div>
              <div className="px-25 py-10">
                <h1 className="text-2xl font-semibold">
                  Login to your account
                </h1>
                <p className="text-muted-foreground text-md">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="px-25 py-3">
                <form action="">
                  <FieldGroup>
                    <Field>
                      <FieldLabel htmlFor="email" className="text-md">
                        Email
                      </FieldLabel>
                      <Input placeholder="johndoe@gmail.com" className="h-12 border-2" />
                    </Field>
                    <Field>
                      <FieldLabel htmlFor="email" className="text-md">
                        Password
                      </FieldLabel>
                      <Input type="password" className="h-12 border-2" />
                    </Field>
                  </FieldGroup>
                  <div className="pt-10">
                    <Button className="w-full h-12 text-lg">Login</Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
