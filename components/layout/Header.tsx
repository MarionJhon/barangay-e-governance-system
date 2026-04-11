"use client";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../ui/breadcrumb";
import { Button } from "../ui/button";
import { BreadcrumbItemProps, useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/contexts/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { toast } from "sonner";

interface HeaderPageProps {
  breadcrumb: BreadcrumbItemProps[];
}

const HeaderPages = ({ breadcrumb }: HeaderPageProps) => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  async function handleSignOut() {
    try {
      const result = await signOut();
      if (result?.error) {
        toast.error(result.error ?? "Something went wrong", {
          position: "top-right",
        });
      }

      router.push("/");
    } catch (error) {
      toast.error("An unexpexted error occurred.", {
        position: "top-right",
      });
    }
  }
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumb.map((crumb, idx) => (
              <div key={idx}>
                {idx > 0 && (
                  <BreadcrumbSeparator className="hidden md:inline-block pr-2" />
                )}
                <BreadcrumbItem
                  className={
                    idx < breadcrumb.length - 1 ? "hidden md:block" : ""
                  }
                >
                  {crumb.isLast ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full">
                {user?.email?.charAt(0).toUpperCase()}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

const HeaderHomePage = () => {
  const pathname = usePathname();

  return (
    <header className="flex h-16 px-10 justify-between items-center bg-white/80">
      <div className="flex flex-1">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-32.png"
            alt="barangay logo"
            width={30}
            height={30}
          />
          <p className="hidden md:block font-medium text-sm">
            Barangay eGovernance System
          </p>
        </Link>
      </div>

      <div className="hidden md:flex items-center rounded-full px-2">
        <Button variant="ghost" className="rounded-full">
          Home
        </Button>
        <Button variant="ghost" className="rounded-full">
          About
        </Button>
        <Button variant="ghost" className="rounded-full">
          Services
        </Button>
        <Button variant="ghost" className="rounded-full">
          Officials
        </Button>
        <Button variant="ghost" className="rounded-full">
          Contact
        </Button>
      </div>

      <div className="flex flex-1 justify-end">
        {pathname !== "/signin" ? (
          <Link
            href="/signin"
            className="flex items-center h-9 px-4 py-2 border bg-background shadow-xs dark:border-input dark:bg-input/30 dark:hover:bg-input/50 rounded-full hover:bg-primary hover:text-primary-foreground"
          >
            Login
          </Link>
        ) : (
          ""
        )}
      </div>
    </header>
  );
};

const Header = () => {
  const breadcrumb = useBreadcrumbs();
  const pathname = usePathname();
  return (
    <>
      {pathname !== "/" && pathname !== "/signin" ? (
        <HeaderPages breadcrumb={breadcrumb} />
      ) : (
        <HeaderHomePage />
      )}
    </>
  );
};

export default Header;
