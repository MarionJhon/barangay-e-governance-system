"use server";

import { getOfficialName } from "@/lib/action/barangay-official";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "../ui/table";

export const OfficialList = async () => {
  const data = await getOfficialName();

  const officialTotalActive = data.filter((val) =>
    ["Punong Barangay", "Kagawad", "Secretary", "Treasurer"].includes(
      val.position,
    ),
  ).length;

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-indigo-600/40 hover:bg-indigo-600/40">
          <TableHead>Full Name</TableHead>
          <TableHead>Position</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {officialTotalActive === 0 ? (
          <TableRow>
            <TableCell
              colSpan={2}
              className="text-center text-muted-foreground"
            >
              No active barangay council
            </TableCell>
          </TableRow>
        ) : (
          data
            .filter((val) =>
              ["Punong Barangay", "Kagawad", "Secretary", "Treasurer"].includes(
                val.position,
              ),
            )
            .map((item) => (
              <TableRow key={item.fullname}>
                <TableCell>{item.fullname}</TableCell>
                <TableCell>{item.position}</TableCell>
              </TableRow>
            ))
        )}
      </TableBody>
    </Table>
  );
};

export const BHWList = async () => {
  const data = await getOfficialName();

  const bhwTotalActive = data.filter((val) =>
    ["Barangay Health Worker"].includes(val.position),
  ).length;

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-rose-500/50 hover:bg-rose-500/50">
          <TableHead>Full Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bhwTotalActive === 0 ? (
          <TableRow>
            <TableCell
              colSpan={2}
              className="text-center text-muted-foreground"
            >
              No active barangay health worker
            </TableCell>
          </TableRow>
        ) : (
          data
            .filter((val) => val.position === "Barangay Health Worker")
            .map((item) => (
              <TableRow key={item.fullname}>
                <TableCell>{item.fullname}</TableCell>
              </TableRow>
            ))
        )}
      </TableBody>
    </Table>
  );
};

export const SKList = async () => {
  const data = await getOfficialName();

  const skTotalActive = data.filter((val) =>
    ["Sangguniang Kabataan"].includes(val.position),
  ).length;

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-purple-600/40 hover:bg-purple-600/40">
          <TableHead>Full Name</TableHead>
          <TableHead>Position</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {skTotalActive === 0 ? (
          <TableRow>
            <TableCell
              colSpan={2}
              className="text-center text-muted-foreground"
            >
              No active sangguniang kabataan
            </TableCell>
          </TableRow>
        ) : (
          data
            .filter((val) =>
              ["Sangguniang Kabataan", "SK Secretary", "SK Treasurer"].includes(
                val.position,
              ),
            )
            .map((item) => (
              <TableRow key={item.fullname}>
                <TableCell>{item.fullname}</TableCell>
                <TableCell>{item.position}</TableCell>
              </TableRow>
            ))
        )}
      </TableBody>
    </Table>
  );
};

export const TanodList = async () => {
  const data = await getOfficialName();

  const skTotalActive = data.filter((val) =>
    ["Tanod"].includes(val.position),
  ).length;

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-red-600/40 hover:bg-red-600/40">
          <TableHead>Full Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {skTotalActive === 0 ? (
          <TableRow>
            <TableCell
              colSpan={2}
              className="text-center text-muted-foreground"
            >
              No active barangay tanod
            </TableCell>
          </TableRow>
        ) : (
          data
            .filter((val) => val.position === "Tanod")
            .map((item) => (
              <TableRow key={item.fullname}>
                <TableCell>{item.fullname}</TableCell>
              </TableRow>
            ))
        )}
      </TableBody>
    </Table>
  );
};

export const LuponList = async () => {
  const data = await getOfficialName();

  const skTotalActive = data.filter((val) =>
    ["Lupon"].includes(val.position),
  ).length;

  return (
    <Table>
      <TableHeader className="hover:bg-none">
        <TableRow className="bg-teal-600/40 hover:bg-teal-600/40">
          <TableHead>Full Name</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {skTotalActive === 0 ? (
          <TableRow>
            <TableCell
              colSpan={2}
              className="text-center text-muted-foreground"
            >
              No active lupon member
            </TableCell>
          </TableRow>
        ) : (
          data
            .filter((val) => val.position === "Lupon")
            .map((item) => (
              <TableRow key={item.fullname}>
                <TableCell>{item.fullname}</TableCell>
              </TableRow>
            ))
        )}
      </TableBody>
    </Table>
  );
};
