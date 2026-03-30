export interface ResidentList {
  id: number | string;
  last_name: string;
  first_name: string;
  middle_name: string;
  suffix: string;
}

export const POSITION_LIMITS: Record<string, number> = {
  "Punong Barangay": 1,
  Kagawad: 7,
  "SK Chairperson": 1,
  "SK Member": 7,
  Secretary: 1,
  Treasurer: 1,
  "SK Secretary": 1,
  "SK Treasurer": 1,
  Lupon: 10,
  "Day Care Worker": 1,
  "Barangay Health Worker": 7,
  Tanod: 10,
};

export interface BarangayOfficial {
  fullname: string;
  position: string;
}

export interface RowOfficial {
  barangay_official: string;
  position: string;
  resident: ResidentList | ResidentList[];
}
