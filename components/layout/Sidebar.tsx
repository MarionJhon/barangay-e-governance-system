"use client";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenuButton,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "../ui/sidebar";
import {
  ChevronRight,
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const AppSidebar = () => {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
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
    { name: "Financial", href: "/financial", icon: HandCoins },
    {
      name: "Social & Sectoral Records",
      href: "/ssr",
      icon: SquaresSubtract,
    },
    {
      name: "Sangguniang Kabataan",
      href: "/sangguniang-kabataan",
      icon: GraduationCap,
    },
    { name: "Barangay Health Worker", href: "/bhw", icon: Hospital },
    {
      name: "Katarungang Pambarangay",
      href: "/katarungang-pambarangay",
      icon: Scale,
    },
    { name: "Disaster & Safety", href: "/disaster-safety", icon: Siren },
  ];

  useEffect(() => {
    const activeIndexes = navigation.reduce<number[]>((acc, nav, idx) => {
      if (nav.items?.some((item) => item.url === pathname)) acc.push(idx);
      return acc;
    }, []);
    setOpenItems(new Set(activeIndexes));
  }, [pathname]);

  function handleToggle(idx: number) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      next.has(idx) ? next.delete(idx) : next.add(idx);
      return next;
    });
  }

  return (
    <Sidebar collapsible="icon">
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
        <SidebarMenu className="px-[0.3rem]">
          {navigation.map((nav, idx) => {
            return (
              <Collapsible
                open={openItems.has(idx)}
                key={idx}
                asChild
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild onClick={() => handleToggle(idx)}>
                    <SidebarMenuButton tooltip={nav.title} className="h-12">
                      {nav.icon && <nav.icon className="size-5! shrink-0" />}
                      <span>{nav.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {nav.items?.map((subItem, idx) => (
                        <SidebarMenuSubItem key={idx}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={subItem.url === pathname}
                            className="h-8"
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                  {/* <SidebarMenuButton
                    className="flex items-center space-x-3 py-2 px-3 h-12 data-[state=collapsed]:justify-center"
                    tooltip={nav.name}
                    isActive={isActive}
                    asChild
                  >
                    <Link href={nav.href!}>
                      <IconComponent className="size-5! shrink-0" />
                      <span className="text-sm">{nav.name}</span>
                    </Link>
                  </SidebarMenuButton> */}
                </SidebarMenuItem>
              </Collapsible>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
