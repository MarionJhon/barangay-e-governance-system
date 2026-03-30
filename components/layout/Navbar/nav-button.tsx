"use client";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const NavButton = ({
  items,
}: {
  items: { title: string; url: string; icon: LucideIcon }[];
}) => {
  const pathname = usePathname();

  return (
    <SidebarMenu className="px-[0.3rem] group-data-[state=collapsed]:ml-[0.2rem]">
      {items.map((item) => (
        <SidebarMenuButton
          key={item.title}
          tooltip={item.title}
          isActive={item.url === pathname}
          asChild
        >
          <Link
            href={item.url}
            className="flex items-center h-12 group-data-[state=collapsed]:justify-center"
          >
            {item.icon && <item.icon className="size-5! shrink-0" />}
            <span className="text-sm group-data-[state=collapsed]:hidden">
              {item.title}
            </span>
          </Link>
        </SidebarMenuButton>
      ))}
    </SidebarMenu>
  );
};

export default NavButton;
