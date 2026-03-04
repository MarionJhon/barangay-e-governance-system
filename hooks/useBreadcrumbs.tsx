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
  bhw: "Barangay Health Worker",
  "katarungang-pambarangay": "Katarungang Pambarangay",
  "disaster-safety": "Disaster & Safety",
};

const useBreadcrumbs = (): BreadcrumbItem[] => {
  const pathname = usePathname();

  const segments: string[] = pathname.split("/").slice(2).filter(Boolean);

  return segments.map((segment, idx): BreadcrumbItem => {
    const sliced: string[] = segments.slice(0, idx + 1);
    const href = "/" + sliced.join("/");
    const label =
      routeLabels[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLast = idx === segments.length - 1;

    return { label, href, isLast };
  });
};

export { useBreadcrumbs };
