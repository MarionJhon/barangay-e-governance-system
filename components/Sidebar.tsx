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
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
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
    { name: "SK", href: "/sangguniang-kabataan", icon: GraduationCap },
    { name: "BHW", href: "/bhw", icon: Hospital },
    {
      name: "Katarungang Pambarangay",
      href: "/katarungang-pambarangay",
      icon: Scale,
    },
    { name: "Disaster & Safety", href: "/disaster-safety", icon: Siren },
  ];
  return (
    <Sidebar className="bg-white dark:bg-black w-80">
      <SidebarHeader>
        <SidebarMenuButton
          className="flex items-center gap-4 p-6"
          aria-label="Go to home"
          asChild
        >
          <Link href="/dashboard">
            <Image src="/logo.png" alt="logo" width={34} height={34} />
            <span className="text-base font-semibold">
              Barangay E-Governance
            </span>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent className="my-3">
        <SidebarMenu className="px-3 space-y-1">
          {navigation.map((nav, idx) => {
            const IconComponent = nav.icon;
            const isActive = currentPath === nav.href;
            return (
              <SidebarMenuItem key={idx}>
                <SidebarMenuButton
                  className={`flex py-6 ${
                    isActive
                      ? "bg-primary text-accent font-semibold"
                      : "hover:bg-primary-foreground text-accent-foreground "
                  }`}
                  asChild
                >
                  <Link href={nav.href}>
                    <IconComponent
                      style={{ width: "1.25rem", height: "1.25rem" }}
                    />
                    <span style={{ fontSize: "0.875rem" }}>{nav.name}</span>
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
