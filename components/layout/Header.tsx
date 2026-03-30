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
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface HeaderPageProps {
  breadcrumb: BreadcrumbItemProps[];
}

const HeaderPages = ({ breadcrumb }: HeaderPageProps) => {
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
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/shadcn-ui/ui/tree/main/apps/v4/app/(examples)/dashboard"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
};

const HeaderHomePage = () => {
  const pathname = usePathname();

  return (
    <header className="flex h-16 justify-between shrink-0 px-10 items-center bg-white/80">
      <div className="flex flex-1">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo-32.png"
            alt="barangay logo"
            width={30}
            height={30}
          />
          <p className="font-medium text-sm">Barangay eGovernance System</p>
        </Link>
      </div>

      <div className="flex items-center backdrop-blur-md bg-white/10 border border-white/20 rounded-full px-2 shadow-[0_0_15px_rgba(255,255,255,0.15)] ring-1 ring-white/10">
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
