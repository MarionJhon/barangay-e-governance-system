import { Input } from "@/components/ui/input";
import { format } from "date-fns";
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
import { Field, FieldLabel } from "@/components/ui/field";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { ScanSearch } from "lucide-react";
import { ResidentType } from "@/lib/types/custodian-of-records";

const ReviewResidentInfo = ({
  reviewData,
  onSubmit,
  onCancel,
  saving,
}: {
  reviewData: ResidentType | null;
  onSubmit: (e: React.SubmitEvent) => Promise<void>;
  onCancel: () => void;
  saving: boolean;
}) => {
  return (
    <Dialog
      open={!!reviewData}
      onOpenChange={(open) => {
        if (!open) onCancel();
      }}
    >
      <form onSubmit={onSubmit} id="create-form">
        <DialogTrigger asChild>
          <Button
            className="w-40 h-15 text-base font-semibold bg-blue-300/90"    
            type="submit"
            form="form-review"
          >
            <ScanSearch className="w-10! h-6!" />{" "}
            <span className="-ml-3">Review</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl!">
          <DialogHeader>
            <DialogTitle>Review Resident Information</DialogTitle>
            <DialogDescription>
              Check all resident details before saving the record.
            </DialogDescription>
          </DialogHeader>
          <div className="px-2 max-h-[65vh] overflow-y-auto pr-4">
            <div className="pb-2 font-medium italic">Personal Information</div>
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
            <div className="pb-2 font-medium italic">Contact Information</div>
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
            <div className="mb-2 font-medium italic">Socio Economic</div>
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
            <div className="mb-2 font-medium italic">Address Information</div>
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
                  <FieldLabel htmlFor="purok" className="text-sm font-semibold">
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
          <DialogFooter>
            <DialogClose asChild>
              <Button
                onClick={onCancel}
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

export default ReviewResidentInfo;
