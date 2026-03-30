import z from "zod";
import { residentSchema } from "../schema/custodian-of-record/residents.validation";

export interface ResidentSource {
  id: number | string;
  last_name: string;
  first_name: string;
  middle_name: string;
  suffix: string;
  sex_at_birth: string;
  purok: string;
  resident_status: string;
}

export type ResidentType = z.infer<typeof residentSchema>;

export interface DeleteResidentDialogProps {
  id: string;
}
