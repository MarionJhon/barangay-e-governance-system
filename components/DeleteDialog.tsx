import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { DeleteResidentDialogProps } from "@/lib/types/custodian-of-records";
import { useState } from "react";
import { deleteResident } from "@/lib/action/resident";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

const DeleteDialog = ({ id }: DeleteResidentDialogProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    const { error } = await deleteResident(id);
    setLoading(false);
    if (error) {
      console.error(error);
      toast.error(error || "Failed to delete resident", {
        position: "top-right",
      });
    }

    toast.success("Resident successfully deleted", { position: "top-right" });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DropdownMenuItem
          className="flex group focus:bg-destructive/10 focus:text-destructive transition-colors duration-200"
          onSelect={(e) => e.preventDefault()}
        >
          <Trash2 className="text-gray-700 group-focus:text-destructive" />
          Delete
        </DropdownMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia>
            <Trash2 />
          </AlertDialogMedia>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the resident info. This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            variant="outline"
            className="focus-visible:ring-0 focus-visible:ring-transparent"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
