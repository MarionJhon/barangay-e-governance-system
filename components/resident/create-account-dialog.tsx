import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogMedia,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "../ui/alert-dialog";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { UserRoundPlus } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { signUpSchema, SignUpType } from "@/lib/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";

const CreateAccountDialog = ({ resident }: { resident: string }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<SignUpType>({ resolver: zodResolver(signUpSchema) });

  const handleCreateAccount = async (e: React.SubmitEvent) => {
    e.preventDefault();

    try {
    } catch (error) {}
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="flex group focus:bg-primary focus:text-green-500 transition-colors duration-200"
          onSelect={(e) => e.preventDefault()}
        >
          <UserRoundPlus className="text-gray-700 group-focus:text-green-500" />
          Create Account
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent size="default">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <UserRoundPlus />
          </AlertDialogMedia>
          <AlertDialogTitle>Create Account</AlertDialogTitle>
          <AlertDialogDescription>
            Create a system login for this resident or official to access
            authorized features.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <form action="">
            <FieldGroup>
              <Field>
                <FieldLabel>Fullname</FieldLabel>
                <Input
                  name="resident"
                  id="resident"
                  value={resident}
                  onChange={(e) => e.target.value}
                  type="text"
                  className="h-12 border-2"
                />
              </Field>
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field>
                    <FieldLabel>Password</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      className="h-12 border-2"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel
            variant="outline"
            className="focus-visible:ring-0 focus-visible:ring-transparent"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={loading}>
            {loading ? (
              <>
                <Spinner />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CreateAccountDialog;
