import { useState } from "react";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { UserRoundPlus } from "lucide-react";
import { Spinner } from "../ui/spinner";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Controller, useForm } from "react-hook-form";
import { signUpSchema, SignUpType } from "@/lib/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/auth-context";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";

const CreateAccountDialog = ({
  resident,
  residentId,
}: {
  resident: string;
  residentId: string;
}) => {
  const [saving, setSaving] = useState(false);
  const { signUp } = useAuth();

  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { password: "" },
  });

  async function handleCreateAccount(formValue: SignUpType) {
    setSaving(true);
    try {
      const createAccount = await signUp(formValue, residentId);

      if (!createAccount?.success) {
        toast.error(createAccount?.error ?? "Something went wrong.", {
          position: "top-right",
        });
        return;
      }

      toast.success(`Account for ${resident} has been created successfully`, {
        position: "top-right",
      });
      form.reset();
    } catch (error) {
      console.error("Unexpected error: ", error);
      toast.error("An unexpected error occurred.", { position: "top-right" });
      return { success: false, error: "An unexpected error occured" };
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog>
      <form onSubmit={form.handleSubmit(handleCreateAccount)} id="create-form">
        <DialogTrigger asChild>
          <DropdownMenuItem
            className="flex group focus:bg-primary focus:text-green-500 transition-colors duration-200"
            onSelect={(e) => e.preventDefault()}
          >
            <UserRoundPlus className="text-gray-700 group-focus:text-green-500" />
            Create Account
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogContent  className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create Account</DialogTitle>
            <DialogDescription>
              Create a system login for this resident or official to access
              authorized features.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel>Fullname</FieldLabel>
              <Input
                name="resident"
                id="resident"
                value={resident}
                onChange={(e) => e.target.value}
                readOnly
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
          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="focus-visible:ring-0 focus-visible:ring-transparent"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" form="create-form" disabled={saving}>
              {saving ? (
                <>
                  <Spinner />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateAccountDialog;
