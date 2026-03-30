"use client";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenuButton,
  SidebarContent,
} from "../ui/sidebar";
import {
  CircleStar,
  GraduationCap,
  HandCoins,
  Hospital,
  LayoutDashboard,
  LibraryBig,
  Scale,
  Siren,
  SquaresSubtract,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import NavButton from "./Navbar/nav-button";
import NavCollapsible from "./Navbar/nav-collapsible";
import * as React from "react";

const navData = {
  navButton: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    {
      title: "Barangay Official",
      url: "/barangay-official",
      icon: CircleStar,
    },
  ],
  navCollabsible: [
    {
      title: "Custodian of Record",
      url: "/custodian-of-record",
      icon: LibraryBig,
      items: [
        {
          title: "Resident",
          url: "/custodian-of-record/resident",
        },
        {
          title: "Document Issuance",
          url: "/custodian-of-record/document-issuance",
        },
        {
          title: "Meeting Minutes",
          url: "/custodian-of-record/meeting-minutes",
        },
        {
          title: "Ordinance & Resolutions",
          url: "/custodian-of-record/ordinance-resolution",
        },
      ],
    },
    { title: "Financial", url: "/financial", icon: HandCoins },
    {
      title: "Social & Sectoral Records",
      url: "/ssr",
      icon: SquaresSubtract,
    },
    {
      title: "Sangguniang Kabataan",
      url: "/sangguniang-kabataan",
      icon: GraduationCap,
    },
    { title: "Barangay Health Worker", url: "/bhw", icon: Hospital },
    {
      title: "Katarungang Pambarangay",
      url: "/katarungang-pambarangay",
      icon: Scale,
    },
    { title: "Disaster & Safety", url: "/disaster-safety", icon: Siren },
  ],
};

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-sidebar-accent">
        <SidebarMenuButton
          className="hover:bg-green-200/20"
          size="lg"
          aria-label="Go to home"
          asChild
        >
          <Link href="/dashboard">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
              <Image src="/logo.png" alt="logo" width={34} height={34} />
            </div>
            <div className="flex-1 text-left text-base leading-tight">
              <span className="truncate font-medium">
                Barangay E-Governance System
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="pt-3">
        <NavButton items={navData.navButton} />
        <NavCollapsible items={navData.navCollabsible} />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
