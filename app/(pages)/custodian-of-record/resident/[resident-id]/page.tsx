"use client";
import AppSidebar from "@/components/layout/Sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import Header from "@/components/layout/Header";
import { BookUser, MapPinHouse, Phone, Sprout } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
import {
  residentSchema,
  residentDefaultValue,
} from "@/lib/schema/custodian-of-record/residents.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { addResidentInfo, updateResident } from "@/lib/action/resident";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UpdateResidentProps } from "@/lib/types/custodian-of-records";
import ReviewResidentInfo from "@/components/resident/review-resident-info";

const UpdateResidentPage = () => {
  const [saving, setSaving] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);

    try {
      if (!reviewData) return;
      const result = await updateResident(reviewData);
      if (result.success) {
        toast.success("resident info successfully added!", {
          position: "top-right",
        });
        router.back();
        form.reset();
      } else {
        toast.error(result.error || "Failed to add resident", {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("Failed to add resident", {
        position: "top-right",
      });
    } finally {
      setSaving(false);
    }
  };

  const form = useForm<UpdateResidentProps>({
    resolver: zodResolver(residentSchema) as any,
    defaultValues: { ...residentDefaultValue },
  });


  return (
    <div className="flex min-h-screen w-full bg-gray-400">
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 grid-cols-2 gap-4 p-4">
          <div className="flex-1">
            <form onSubmit={form.handleSubmit(onSubmit)} id="form-review">
              <FieldGroup>
                <div className="flex flex-col gap-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <FieldSet>
                        <FieldLegend className="flex items-center gap-2">
                          <BookUser className="w-5 h-5" />
                          Personal Information
                        </FieldLegend>
                        <FieldDescription>
                          Enter the resident’s personal details for official
                          records and documentation.
                        </FieldDescription>
                        <FieldGroup className="px-2">
                          <div className="grid grid-cols-2 gap-4">
                            <Controller
                              name="last_name"
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor="last_name">
                                    Last Name{" "}
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="last_name"
                                    placeholder="Enter resident's last name"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                    className="h-12 px-4 py-2"
                                  />
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                            <Controller
                              name="first_name"
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor="first-name">
                                    First Name{" "}
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="first_name"
                                    placeholder="Enter resident's first name"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                    className="h-12 px-4 py-2"
                                  />
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <Controller
                              name="suffix"
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor="suffix">
                                    Suffix
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="suffix"
                                    placeholder="e.g., Jr., Sr., III (optional)"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                    className="h-12 px-4 py-2"
                                  />
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                            <Controller
                              name="middle_name"
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor="middle-name">
                                    Middle Name
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="middle_name"
                                    placeholder="Enter middle name (optional)"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                    className="h-12 px-4 py-2"
                                  />
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                          </div>

                          <Controller
                            name="date_of_birth"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="date_of_birth">
                                  Date of Birth{" "}
                                </FieldLabel>
                                <Popover>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      aria-invalid={fieldState.invalid}
                                      className="h-12 px-4 py-2 justify-between text-left hover:bg-transparent"
                                    >
                                      {field.value ? (
                                        field.value.toLocaleDateString()
                                      ) : (
                                        <span className="text-gray-500 font-normal">
                                          Select date of birth
                                        </span>
                                      )}
                                    </Button>
                                  </PopoverTrigger>
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                  <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                  >
                                    <Calendar
                                      mode="single"
                                      captionLayout="dropdown"
                                      selected={field.value}
                                      onSelect={field.onChange}
                                      defaultMonth={field.value}
                                      disabled={(date) => date > new Date()}
                                    />
                                  </PopoverContent>
                                </Popover>
                              </Field>
                            )}
                          />
                          <Controller
                            name="birth_place"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="birth_place">
                                  Birth Place{" "}
                                </FieldLabel>

                                <Input
                                  {...field}
                                  id="birthplace"
                                  placeholder="Enter city or municipality of birth"
                                  autoComplete="off"
                                  aria-invalid={fieldState.invalid}
                                  className="h-12 px-4 py-2"
                                />
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />

                          <div className="grid grid-cols-2 gap-4">
                            <Controller
                              name="sex_at_birth"
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor="sex_at_birth">
                                    Sex of Birth{" "}
                                  </FieldLabel>
                                  <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger
                                      className="h-12!"
                                      aria-invalid={fieldState.invalid}
                                    >
                                      <SelectValue placeholder="Select sex" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                      <SelectGroup>
                                        <SelectItem value="Male">
                                          Male
                                        </SelectItem>
                                        <SelectItem value="Female">
                                          Female
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                            <Controller
                              name="civil_status"
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor="civil-status">
                                    Civil Status{" "}
                                  </FieldLabel>
                                  <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger
                                      className="h-12!"
                                      aria-invalid={fieldState.invalid}
                                    >
                                      <SelectValue placeholder="Select civil status" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                      <SelectGroup>
                                        <SelectItem value="Single">
                                          Single
                                        </SelectItem>
                                        <SelectItem value="Married">
                                          Married
                                        </SelectItem>
                                        <SelectItem value="Widowed">
                                          Widowed
                                        </SelectItem>
                                        <SelectItem value="Separated">
                                          Separated
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <Controller
                              name="citizenship"
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor="citizenship">
                                    Citizenship
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="citizenship"
                                    placeholder="e.g., Filipino"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                    className="h-12 px-4 py-2"
                                  />
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                            <Controller
                              name="religion"
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor="religion">
                                    Religion
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="religion"
                                    placeholder="Enter religion (optional)"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                    className="h-12 px-4 py-2"
                                  />
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                          </div>
                        </FieldGroup>
                        <FieldSet>
                          <FieldLegend className="flex items-center gap-2">
                            <Phone className="w-5 h-5" />
                            Contact Information
                          </FieldLegend>
                          <FieldDescription>
                            Enter the resident’s phone number or email for
                            official communication.
                          </FieldDescription>
                        </FieldSet>
                        <FieldGroup className="px-2">
                          <Controller
                            name="contact_number"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="contact_number">
                                  Contact Number
                                </FieldLabel>
                                <Input
                                  {...field}
                                  id="contact"
                                  placeholder="e.g., 09********* or +639********"
                                  autoComplete="off"
                                  aria-invalid={fieldState.invalid}
                                  className="h-12 px-4 py-2"
                                />
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                          <Controller
                            name="email_address"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="email_address">
                                  Email Address
                                </FieldLabel>
                                <Input
                                  {...field}
                                  id="email"
                                  placeholder="Enter email address (optional)"
                                  autoComplete="off"
                                  aria-invalid={fieldState.invalid}
                                  className="h-12 px-4 py-2"
                                />
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </FieldGroup>
                      </FieldSet>
                    </div>
                    <div>
                      <FieldSet>
                        <FieldLegend className="flex items-center gap-2">
                          <Sprout className="w-5 h-5" />
                          Socio Economic
                        </FieldLegend>
                        <FieldDescription>
                          Enter employment, income, and education details for
                          resident profiling.
                        </FieldDescription>
                        <FieldGroup className="px-2">
                          <Controller
                            name="occupation"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="occupation">
                                  Occupation
                                </FieldLabel>
                                <Input
                                  {...field}
                                  id="occupation"
                                  placeholder="Enter current occupation"
                                  autoComplete="off"
                                  aria-invalid={fieldState.invalid}
                                  className="h-12 px-4 py-2"
                                />
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                          <Controller
                            name="employment_status"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="employment_status">
                                  Employment Status
                                </FieldLabel>
                                <Select
                                  name={field.name}
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger
                                    className="h-12!"
                                    aria-invalid={fieldState.invalid}
                                  >
                                    <SelectValue placeholder="Select employment status" />
                                  </SelectTrigger>
                                  <SelectContent position="popper">
                                    <SelectGroup>
                                      <SelectItem value="Employed">
                                        Employed
                                      </SelectItem>
                                      <SelectItem value="Unemployed">
                                        Unemployed
                                      </SelectItem>
                                      <SelectItem value="Self-Employed">
                                        Self-Employed
                                      </SelectItem>
                                      <SelectItem value="Student">
                                        Student
                                      </SelectItem>
                                      <SelectItem value="Retired">
                                        Retired
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                          <Controller
                            name="monthly_income"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="monthly_income">
                                  Monthly Income
                                </FieldLabel>
                                <Input
                                  {...field}
                                  id="monthly-income"
                                  placeholder="Enter estimated monthly income"
                                  autoComplete="off"
                                  aria-invalid={fieldState.invalid}
                                  className="h-12 px-4 py-2"
                                />
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                          <Controller
                            name="educational_attainment"
                            control={form.control}
                            render={({ field, fieldState }) => (
                              <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="educational_attainment">
                                  Educational Attainment
                                </FieldLabel>
                                <Select
                                  name={field.name}
                                  value={field.value}
                                  onValueChange={field.onChange}
                                >
                                  <SelectTrigger
                                    className="h-12!"
                                    aria-invalid={fieldState.invalid}
                                  >
                                    <SelectValue placeholder="Select highest education completed" />
                                  </SelectTrigger>
                                  <SelectContent position="popper">
                                    <SelectGroup>
                                      <SelectItem value="Elementary Level">
                                        Elementary Level
                                      </SelectItem>
                                      <SelectItem value="Elementary Graduate">
                                        Elementary Graduate
                                      </SelectItem>
                                      <SelectItem value="High School Level">
                                        High School Level
                                      </SelectItem>
                                      <SelectItem value="High School Graduate">
                                        High School Graduate
                                      </SelectItem>
                                      <SelectItem value="College Level">
                                        College Level
                                      </SelectItem>
                                      <SelectItem value="College Graduate">
                                        College Graduate
                                      </SelectItem>
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                {fieldState.invalid && (
                                  <FieldError errors={[fieldState.error]} />
                                )}
                              </Field>
                            )}
                          />
                        </FieldGroup>
                        <FieldSet>
                          <FieldLegend className="flex items-center gap-2">
                            <MapPinHouse className="w-5 h-5" />
                            Address Information
                          </FieldLegend>
                          <FieldDescription>
                            Enter the resident’s current address for proper
                            identification and location within the barangay.
                          </FieldDescription>
                          <FieldGroup className="px-2">
                            <Controller
                              name="house_no"
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor="house_no">
                                    House No.
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="houseno"
                                    placeholder="Enter house number"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                    className="h-12 px-4 py-2"
                                  />
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                            <Controller
                              name="street_name"
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor="street_name">
                                    Street Name
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="street-name"
                                    placeholder="Enter street name (optional)"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                    className="h-12 px-4 py-2"
                                  />
                                </Field>
                              )}
                            />
                            <Controller
                              name="purok"
                              control={form.control}
                              render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                  <FieldLabel htmlFor="purok">Purok</FieldLabel>
                                  <Select
                                    name={field.name}
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <SelectTrigger
                                      className="h-12!"
                                      aria-invalid={fieldState.invalid}
                                    >
                                      <SelectValue placeholder="Select purok" />
                                    </SelectTrigger>
                                    <SelectContent position="popper">
                                      <SelectGroup>
                                        <SelectItem value="Purok 1">
                                          Purok 1
                                        </SelectItem>
                                        <SelectItem value="Purok 2">
                                          purok 2
                                        </SelectItem>
                                        <SelectItem value="Purok 3">
                                          purok 3
                                        </SelectItem>
                                      </SelectGroup>
                                    </SelectContent>
                                  </Select>
                                  {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                  )}
                                </Field>
                              )}
                            />
                          </FieldGroup>
                          <FieldSet>
                            <FieldGroup className="px-2">
                              <Controller
                                name="resident_status"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                  <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="resident_status">
                                      Resident Status
                                    </FieldLabel>
                                    <Select
                                      name={field.name}
                                      value={field.value}
                                      onValueChange={field.onChange}
                                    >
                                      <SelectTrigger
                                        className="h-12!"
                                        aria-invalid={fieldState.invalid}
                                      >
                                        <SelectValue placeholder="Select resident status" />
                                      </SelectTrigger>
                                      <SelectContent position="popper">
                                        <SelectGroup>
                                          <SelectItem value="Permanent Resident">
                                            Permanent Resident
                                          </SelectItem>
                                          <SelectItem value="Temporary Resident">
                                            Temporary Resident
                                          </SelectItem>
                                          <SelectItem value="Moved Out">
                                            Moved Out
                                          </SelectItem>
                                          <SelectItem value="Deceased">
                                            Deceased
                                          </SelectItem>
                                        </SelectGroup>
                                      </SelectContent>
                                    </Select>
                                    {fieldState.invalid && (
                                      <FieldError errors={[fieldState.error]} />
                                    )}
                                  </Field>
                                )}
                              />
                            </FieldGroup>
                          </FieldSet>
                        </FieldSet>
                      </FieldSet>
                    </div>
                  </div>
                </div>
              </FieldGroup>
            </form>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
};

export default UpdateResidentPage;
