import {
  Sidebar,
  SidebarHeader,
  SidebarMenuButton,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import {
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

const AppSidebar = ({
  currentPath = "/dashboard",
}: {
  currentPath: string;
}) => {
  const navigation = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    {
      name: "Custodian of Record",
      href: "/custodian-of-record",
      icon: LibraryBig,
    },
    { name: "Financial", href: "/financial", icon: HandCoins },
    {
      name: "Social & Sectoral Records",
      href: "/SSR",
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
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton size="lg" aria-label="Go to home" asChild>
          <Link href="/dashboard">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
              <Image src="/logo.png" alt="logo" width={34} height={34} />
            </div>
            <div className="flex-1 text-left text-base leading-tight">
              <span className="truncate font-medium">
                Barangay E-Governance
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="px-[0.3rem]">
          {navigation.map((nav, idx) => {
            const IconComponent = nav.icon;
            const isActive = currentPath === nav.href;
            return (
              <SidebarMenuItem key={idx}>
                <SidebarMenuButton
                  className="flex items-center space-x-3 py-2 px-3 h-12 data-[state=collapsed]:justify-center"
                  tooltip={nav.name}
                  isActive={isActive}
                  asChild
                >
                  <Link href={nav.href}>
                    <IconComponent className="size-5! shrink-0" />
                    <span className="text-sm">{nav.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
