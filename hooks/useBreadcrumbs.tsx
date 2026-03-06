"use client";
import { usePathname } from "next/navigation";

export type BreadcrumbItem = {
  label: string;
  href: string;
  isLast: boolean;
};

const routeLabels: Record<string, string> = {
  dashboard: "Dashboard",
  resident: "Resident",
  "document-issuance": "Document Issuance",
  "meeting-minutes": "Meeting Minutes",
  "ordinance-resolution": "Ordinances & Resolution",
};

const mainRoutes: Record<string, string> = {
  "document-issuance": "/custodian-of-record/document-issuance",
  "meeting-minutes": "/custodian-of-record/meeting-minutes",
  "ordinance-resolution": "/custodian-of-record/ordinance-resolution",
  resident: "/custodian-of-record/resident",
};

const hiddenSegments = ["custodian-of-record"];

function formatSegmentLabel(segment: string): string {
  return segment
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const useBreadcrumbs = (): BreadcrumbItem[] => {
  const pathname = usePathname();

  const segments: string[] = pathname.split("/").filter(Boolean);

  //filter out hidden segments
  const visibleSegments = segments.filter(
    (segment) => !hiddenSegments.includes(segment)
  );

  return visibleSegments.map((segment: string, idx: number): BreadcrumbItem => {
    const sliced: string[] = segments.slice(0, segments.indexOf(segment) + 1);
    const href = mainRoutes[segment] ?? "/" + sliced.join("/");
    const label = routeLabels[segment] ?? formatSegmentLabel(segment);
    const isLast = idx === visibleSegments.length - 1;

    return { label, href, isLast };
  });
};

export { useBreadcrumbs };
