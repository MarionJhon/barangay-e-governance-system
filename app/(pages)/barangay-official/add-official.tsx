"use client";
import { ResidentTableType } from "@/components/columns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Check, ChevronsUpDown, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useFieldArray } from "react-hook-form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  addBarangayOfficial,
  fetchResidentList,
} from "@/lib/action/barangay-official";
import {
  officialDefaultValue,
  officialSchema,
  OfficialType,
  POSITION_WITH_BENEFICIARIES,
} from "@/lib/schema/barangay-official.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";

const NameListSkeleton = () => (
  <>
    {Array.from({ length: 4 }).map((_, i) => (
      <CommandItem key={i} disabled>
        <Skeleton className="h-4 w-full" />
      </CommandItem>
    ))}
  </>
);

const AddOfficialModal = () => {
  const [nameOfficials, setNameOfficials] = useState<
    Pick<ResidentTableType, "id" | "fullName">[]
  >([]);
  const [open, setOpen] = useState(false);
  const [openBeneficiary, setOpenBeneficiary] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<OfficialType>({
    resolver: zodResolver(officialSchema) as any,
    defaultValues: { ...officialDefaultValue },
  });

  const selectedPosition = form.watch("position");

  useEffect(() => {
    async function loadName() {
      setIsLoading(true);
      try {
        const data = await fetchResidentList();
        setNameOfficials(data);
      } finally {
        setIsLoading(false);
      }
    }

    loadName();
  }, []);

  useEffect(() => {
    const requiresBeneficiaries = POSITION_WITH_BENEFICIARIES.includes(
      selectedPosition as any,
    );

    if (!requiresBeneficiaries) {
      form.setValue("beneficiaries", []);
      return;
    }

    const current = form.getValues("beneficiaries");
    if (!current || current.length === 0) {
      form.setValue("beneficiaries", [{ name: "", relationship: "" }]);
    }
  }, [selectedPosition, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "beneficiaries",
  });

  async function handleFormSubmit(data: OfficialType) {
    setSaving(true);

    try {
      const result = await addBarangayOfficial(data);
      console.log(result.error);
      if (!result.success) {
        toast.error(result.error ?? "Something went wrong.", {
          position: "top-right",
        });
        return;
      }

      toast.success("Barangay official added successfully.", {
        position: "top-right",
      });
      form.reset(officialDefaultValue);
      setDialogOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred.", { position: "top-right" });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) {
          form.reset();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Add Official
        </Button>
      </DialogTrigger>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} id="official-form">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Barangay Official</DialogTitle>
            <DialogDescription>
              Add an elective or appointive position to a resident.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <Controller
              control={form.control}
              name="official_name"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="official_name">
                    Full Name
                    <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild aria-invalid={fieldState.invalid}>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        aria-invalid={fieldState.invalid}
                        className={cn(
                          "w-full h-12 justify-between font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? nameOfficials.find(
                              (item) => item.id === field.value,
                            )?.fullName
                          : "Select a name"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                    <PopoverContent className="w-full p-0" align="start">
                      <Command className="w-[28.7rem]">
                        <CommandInput
                          placeholder="Search name..."
                          className="h-12 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent ring-primary"
                        />
                        <CommandList>
                          {!isLoading && nameOfficials.length === 0 && (
                            <CommandEmpty>No name found.</CommandEmpty>
                          )}

                          {isLoading ? (
                            <NameListSkeleton />
                          ) : (
                            <CommandGroup>
                              {nameOfficials.slice(0,5).map((item) => (
                                <CommandItem
                                  key={item.id}
                                  value={item.fullName}
                                  onSelect={() => {
                                    field.onChange(item.id);
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      field.value === item.id
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {item.fullName}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          )}
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </Field>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="date_of_election"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="date_of_election">
                      Date of Election <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild aria-invalid={fieldState.invalid}>
                        <Button
                          variant="outline"
                          aria-invalid={fieldState.invalid}
                          className="h-12 px-4 py-2 justify-between text-left hover:bg-transparent"
                        >
                          {field.value ? (
                            field.value.toLocaleDateString()
                          ) : (
                            <span className="text-gray-500 font-normal">
                              Select date of election
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                      <PopoverContent className="w-auto p-0" align="start">
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
                name="term_start"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="term_start">
                      Date of Assumption
                      <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Popover>
                      <PopoverTrigger asChild aria-invalid={fieldState.invalid}>
                        <Button
                          variant="outline"
                          aria-invalid={fieldState.invalid}
                          className="h-12 px-4 py-2 justify-between text-left hover:bg-transparent"
                        >
                          {field.value ? (
                            field.value.toLocaleDateString()
                          ) : (
                            <span className="text-gray-500 font-normal">
                              Select date of assumption
                            </span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                      <PopoverContent className="w-auto p-0" align="start">
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
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="position"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="position">
                      Position <span className="text-red-500">*</span>
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
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectGroup>
                          <SelectItem value="Punong Barangay">
                            Punong Barangay
                          </SelectItem>
                          <SelectItem value="Kagawad">Kagawad</SelectItem>
                          <SelectItem value="SK Chairperson">
                            SK Chairperson
                          </SelectItem>
                          <SelectItem value="SK Member">SK Member</SelectItem>
                          <SelectItem value="Barangay Treasurer">
                            Barangay Treasurer
                          </SelectItem>
                          <SelectItem value="Barangay Secretary">
                            Barangay Secretary
                          </SelectItem>
                          <SelectItem value="SK Treasurer">
                            SK Treasurer
                          </SelectItem>
                          <SelectItem value="SK Secretary">
                            SK Secretary
                          </SelectItem>
                          <SelectItem value="Barangay Health Worker">
                            Barangay Health Worker
                          </SelectItem>
                          <SelectItem value="Tanod">
                            Barangay Tanod
                          </SelectItem>
                          <SelectItem value="Day Care Worker">
                            Day Care Worker
                          </SelectItem>
                          <SelectItem value="Lupon">
                            Lupon Member
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
                name="honorarium"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="honorarium">
                      Honorarium <span className="text-red-500">*</span>
                    </FieldLabel>
                    <Input
                      {...field}
                      id="honorarium"
                      placeholder="Enter honorarium"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      className="h-12 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent ring-primary"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {POSITION_WITH_BENEFICIARIES.includes(selectedPosition as any) && (
              <FieldSet>
                <FieldLegend>Beneficiaries</FieldLegend>
                <div className="flex flex-col gap-4">
                  {fields.map((fieldItem, index) => (
                    <div
                      key={fieldItem.id}
                      className="grid grid-cols-2 gap-4 items-end"
                    >
                      <Controller
                        name={`beneficiaries.${index}.name`}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            {index === 0 && (
                              <FieldLabel
                                htmlFor={`beneficiaries.${index}.name`}
                              >
                                Full Name{" "}
                                <span className="text-red-500">*</span>
                              </FieldLabel>
                            )}
                            <Popover
                              open={openBeneficiary === index}
                              onOpenChange={(isOpen) =>
                                setOpenBeneficiary(isOpen ? index : null)
                              }
                            >
                              <PopoverTrigger
                                asChild
                                aria-invalid={fieldState.invalid}
                              >
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-invalid={fieldState.invalid}
                                  className={cn(
                                    "w-full h-12 justify-between font-normal",
                                    !field.value && "text-muted-foreground",
                                  )}
                                >
                                  {field.value
                                    ? nameOfficials.find(
                                        (item) => item.id === field.value,
                                      )?.fullName
                                    : "Search a name"}
                                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                              )}
                              <PopoverContent
                                className="w-full p-0"
                                align="start"
                              >
                                <Command className="w-[13.7rem]">
                                  <CommandInput
                                    placeholder="Search name..."
                                    className="h-12"
                                  />
                                  <CommandList>
                                    {!isLoading &&
                                      nameOfficials.length === 0 && (
                                        <CommandEmpty>
                                          No name found.
                                        </CommandEmpty>
                                      )}

                                    {isLoading ? (
                                      <NameListSkeleton />
                                    ) : (
                                      <CommandGroup>
                                        {nameOfficials.slice(0,5).map((item) => (
                                          <CommandItem
                                            key={item.id}
                                            value={item.fullName} // search matches by name
                                            onSelect={() => {
                                              field.onChange(item.id); // stores id
                                              setOpenBeneficiary(null);
                                            }}
                                          >
                                            <Check
                                              className={cn(
                                                "mr-2 h-4 w-4",
                                                field.value === item.id
                                                  ? "opacity-100"
                                                  : "opacity-0",
                                              )}
                                            />
                                            {item.fullName}
                                          </CommandItem>
                                        ))}
                                      </CommandGroup>
                                    )}
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </Field>
                        )}
                      />

                      <Controller
                        name={`beneficiaries.${index}.relationship`}
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            {index === 0 && (
                              <FieldLabel
                                htmlFor={`beneficiaries.${index}.relationship`}
                              >
                                Relationship{" "}
                                <span className="text-red-500">*</span>
                              </FieldLabel>
                            )}
                            <div className="flex gap-2">
                              <Input
                                {...field}
                                placeholder="Enter relationship"
                                autoComplete="off"
                                aria-invalid={fieldState.invalid}
                                className="h-12 px-4 py-2 border border-gray-200 rounded-lg focus:border-transparent ring-primary"
                              />
                              {fields.length > 1 && (
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="icon"
                                  className="h-12 w-12 shrink-0 text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
                                  onClick={() => remove(index)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </div>
                  ))}

                  <Button
                    type="button"
                    variant="outline"
                    className="w-fit gap-2 text-accent-foreground border-primary hover:bg-primary/5"
                    onClick={() => append({ name: "", relationship: "" })}
                  >
                    <Plus className="h-4 w-4" />
                    Add Beneficiary
                  </Button>
                </div>
              </FieldSet>
            )}
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              type="submit"
              form="official-form"
              disabled={saving}
              className="hover:bg-primary/80"
            >
              {saving ? (
                <>
                  <Spinner /> Saving...
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

export default AddOfficialModal;
