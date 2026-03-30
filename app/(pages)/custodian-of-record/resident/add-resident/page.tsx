"use client";
import AppSidebar from "@/components/layout/Sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import Header from "@/components/layout/Header";
import {
  BookUser,
  MapPinHouse,
  Phone,
  ScanSearch,
  Sprout,
  SquareChartGantt,
} from "lucide-react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { format } from "date-fns";
import { addResidentInfo } from "@/lib/action/resident";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { ResidentType } from "@/lib/types/custodian-of-records";

const AddResidentPage = () => {
  const [saving, setSaving] = useState<boolean>(false);
  const reviewRef = useRef<ResidentType | null>(null);
  const [reviewData, setReviewData] = useState<ResidentType | null>(null);

  const router = useRouter();

  const onSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    setSaving(true);

    try {
      if (!reviewData) return;
      const result = await addResidentInfo(reviewData);
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

  const form = useForm<ResidentType>({
    resolver: zodResolver(residentSchema) as any,
    defaultValues: { ...residentDefaultValue },
  });

  function onReview(values: ResidentType) {
    reviewRef.current = values;
    setReviewData(values); // populate review card
    form.reset({ ...residentDefaultValue });
  }

  function onCancel() {
    const saved = reviewRef.current;
    reviewRef.current = null;
    setReviewData(null);
    form.reset({ ...saved }); //restores fields
  }

  return (
    <div className="flex min-h-screen w-full bg-gray-400">
      <AppSidebar />
      <SidebarInset>
        <Header />
        <div className="flex flex-1 grid-cols-2 gap-4 p-4">
          <div className="flex-1">
            <form onSubmit={form.handleSubmit(onReview)}>
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
                                    <span className="text-red-500">*</span>
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="last_name"
                                    placeholder="Enter resident's last name"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                    className="h-12 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent ring-primary"
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
                                    <span className="text-red-500">*</span>
                                  </FieldLabel>
                                  <Input
                                    {...field}
                                    id="first_name"
                                    placeholder="Enter resident's first name"
                                    autoComplete="off"
                                    aria-invalid={fieldState.invalid}
                                    className="h-12 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent ring-primary"
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
                                    className="h-12 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent ring-primary"
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
                                    className="h-12 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent ring-primary"
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
                                  <span className="text-red-500">*</span>
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
                                  <span className="text-red-500">*</span>
                                </FieldLabel>

                                <Input
                                  {...field}
                                  id="birthplace"
                                  placeholder="Enter city or municipality of birth"
                                  autoComplete="off"
                                  aria-invalid={fieldState.invalid}
                                  className="h-12 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent ring-primary"
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
                                    <span className="text-red-500">*</span>
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
                                    <span className="text-red-500">*</span>
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
                                    className="h-12 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent ring-primary"
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
                                    className="h-12 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent ring-primary"
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
                                  className="h-12 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent ring-primary"
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
                                  className="h-12 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent ring-primary"
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
                                  className="h-12 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent ring-primary"
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
                                  className="h-12 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent ring-primary"
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
                                    className="h-12 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent ring-primary"
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
                                    className="h-12 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent ring-primary"
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
                  <div className="flex justify-end pr-2">
                    {!reviewData && (
                      <Button
                        className="w-40 h-15 text-base font-semibold bg-blue-300/90"
                        type="submit"
                      >
                        <ScanSearch className="w-10! h-6!" />{" "}
                        <span className="-ml-3">Review</span>
                      </Button>
                    )}
                  </div>
                </div>
              </FieldGroup>
            </form>
          </div>
          {/* Review Section */}
          <div className="w-200">
            <Card className="h-243">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <SquareChartGantt className="w-5 h-5" />
                  Review Information
                </CardTitle>
                <CardDescription>
                  Check all resident details before saving the record.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {reviewData === null ? (
                  <div className="flex items-center justify-center mt-100">
                    <h1 className="italic text-2xl">No data to review!</h1>
                  </div>
                ) : (
                  <form id="review-form" onSubmit={onSubmit}>
                    <div className="px-2">
                      <div className="pb-2 font-medium italic">
                        Personal Information
                      </div>
                      <div className="flex flex-1 flex-col gap-4 mb-5">
                        <div className="grid auto-rows-auto md:grid-cols-4 gap-4">
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              name="last_name"
                              value={reviewData?.last_name ?? ""}
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="last_name"
                              className="text-sm font-semibold"
                            >
                              Last Name
                            </FieldLabel>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              name="first_name"
                              value={reviewData?.first_name ?? ""}
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="firsname"
                              className="text-sm font-semibold"
                            >
                              First Name
                            </FieldLabel>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              name="suffix"
                              value={reviewData?.suffix ?? ""}
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="suffix"
                              className="text-sm font-semibold"
                            >
                              Suffix
                            </FieldLabel>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              name="middle_name"
                              value={reviewData?.middle_name ?? ""}
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="middle_name"
                              className="text-sm font-semibold"
                            >
                              Middle Name
                            </FieldLabel>
                          </Field>
                        </div>
                        <div className="grid auto-rows-min md:grid-cols-3 gap-4">
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              value={
                                reviewData?.date_of_birth
                                  ? format(reviewData?.date_of_birth, "PPP")
                                  : ""
                              }
                              name="date_of_birth"
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="date_of_birth"
                              className="text-sm font-semibold"
                            >
                              Date of Birth
                            </FieldLabel>
                          </Field>

                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              value={reviewData?.birth_place ?? ""}
                              name="birth_place"
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="birth_place"
                              className="text-sm font-semibold"
                            >
                              Birth Place
                            </FieldLabel>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              value={reviewData?.sex_at_birth ?? ""}
                              name="sex_at_birth"
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="sex_at_birth"
                              className="text-sm font-semibold"
                            >
                              Sex of Birth
                            </FieldLabel>
                          </Field>
                        </div>
                        <div className="grid auto-rows-min md:grid-cols-3 gap-4">
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              value={reviewData?.civil_status ?? ""}
                              name="civil_status"
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="civil_status"
                              className="text-sm font-semibold"
                            >
                              Civil Status
                            </FieldLabel>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              value={reviewData?.citizenship ?? ""}
                              name="citizenship"
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="citizenship"
                              className="text-sm font-semibold"
                            >
                              Citizenship
                            </FieldLabel>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              value={reviewData?.religion ?? ""}
                              name="religion"
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="religion"
                              className="text-sm font-semibold"
                            >
                              Religion
                            </FieldLabel>
                          </Field>
                        </div>
                      </div>
                      <div className="pb-2 font-medium italic">
                        Contact Information
                      </div>
                      <div className="flex flex-1 flex-col gap-4 mb-5">
                        <div className="grid auto-rows-min md:grid-cols-2 gap-4">
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              value={reviewData?.contact_number ?? ""}
                              name="contact_number"
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="contact_number"
                              className="text-sm font-semibold"
                            >
                              Contact Number
                            </FieldLabel>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              value={reviewData?.email_address ?? ""}
                              name="email_address"
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="email_address"
                              className="text-sm font-semibold"
                            >
                              Email Address
                            </FieldLabel>
                          </Field>
                        </div>
                      </div>
                      <div className="mb-2 font-medium italic">
                        Socio Economic
                      </div>
                      <div className="flex flex-1 flex-col gap-4 mb-5">
                        <div className="grid auto-rows-min md:grid-cols-2 gap-4">
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              value={reviewData?.occupation ?? ""}
                              name="occupation"
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="occupation"
                              className="text-sm font-semibold"
                            >
                              Occupation
                            </FieldLabel>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              value={reviewData?.employment_status ?? ""}
                              name="employment_status"
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="employment_status"
                              className="text-sm font-semibold"
                            >
                              Employment Status
                            </FieldLabel>
                          </Field>
                        </div>
                        <div className="grid auto-rows-min md:grid-cols-2 gap-4">
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              value={reviewData?.monthly_income ?? ""}
                              name="monthly_income"
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="monthly_income"
                              className="text-sm font-semibold"
                            >
                              Monthly Income
                            </FieldLabel>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              value={reviewData?.educational_attainment ?? ""}
                              name="educational_attainment"
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="educational_attainment"
                              className="text-sm font-semibold"
                            >
                              Educational Attainment
                            </FieldLabel>
                          </Field>
                        </div>
                      </div>
                      <div className="mb-2 font-medium italic">
                        Address Information
                      </div>
                      <div className="flex flex-1 flex-col gap-4 mb-5">
                        <div className="grid auto-rows-min md:grid-cols-3 gap-4">
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              value={reviewData?.house_no ?? ""}
                              name="house_no"
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="house_no"
                              className="text-sm font-semibold"
                            >
                              House No.
                            </FieldLabel>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              value={reviewData?.street_name ?? ""}
                              name="street_name"
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="street_name"
                              className="text-sm font-semibold"
                            >
                              Street Name
                            </FieldLabel>
                          </Field>
                          <Field
                            orientation="horizontal"
                            className="flex flex-col items-center"
                          >
                            <Input
                              readOnly
                              value={reviewData?.purok ?? ""}
                              name="purok"
                              className="w-full text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                            />
                            <FieldLabel
                              htmlFor="purok"
                              className="text-sm font-semibold"
                            >
                              Purok
                            </FieldLabel>
                          </Field>
                        </div>
                      </div>
                      <Field
                        orientation="horizontal"
                        className="flex flex-col items-center"
                      >
                        <Input
                          readOnly
                          value={reviewData?.resident_status ?? ""}
                          name="resident_status"
                          className="text-center border-0 border-b border-gray-600 rounded-none shadow-none focus-visible:border-gray-600 focus-visible:ring-0 focus-visible:ring-transparent bg-transparent"
                        />
                        <FieldLabel
                          htmlFor="resident_status"
                          className="text-sm font-semibold"
                        >
                          Resident Status
                        </FieldLabel>
                      </Field>
                    </div>
                  </form>
                )}
              </CardContent>
              {reviewData && (
                <CardFooter>
                  <Field orientation="horizontal" className="justify-end">
                    <Button type="button" variant="outline" onClick={onCancel}>
                      Cancel
                    </Button>
                    <Button type="submit" form="review-form" disabled={saving}>
                      {saving ? (
                        <>
                          <Spinner />
                          Submitting...
                        </>
                      ) : (
                        "Submit"
                      )}
                    </Button>
                  </Field>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </SidebarInset>
    </div>
  );
};

export default AddResidentPage;
