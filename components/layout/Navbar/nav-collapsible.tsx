"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  SidebarMenuButton,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarGroup,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NavCollapsible = ({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    items?: { title: string; url: string }[];
  }[];
}) => {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  useEffect(() => {
    const activeIndexes = items.reduce<number[]>((acc, nav, idx) => {
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
    <SidebarMenu className="px-[0.3rem] group-data-[state=collapsed]:ml-[0.2rem]">
      {items.map((nav, idx) => (
        <Collapsible
          open={openItems.has(idx)}
          key={idx}
          asChild
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild onClick={() => handleToggle(idx)}>
              <SidebarMenuButton tooltip={nav.title} className="flex items-center h-12 group-data-[state=collapsed]:justify-center">
                {nav.icon && <nav.icon className="size-5! shrink-0" />}
                <span className="text-sm group-data-[state=collapsed]:hidden">{nav.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 group-data-[state=collapsed]:hidden" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="transition-all duration-200">
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
          </SidebarMenuItem>
        </Collapsible>
      ))}
    </SidebarMenu>
  );
};

export default NavCollapsible;
