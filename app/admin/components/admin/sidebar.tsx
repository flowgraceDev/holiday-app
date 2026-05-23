// app/admin/components/admin/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { memo, useCallback, useMemo, useState } from "react";
import LogoutButton from "../../logout-button";
import {
  ChevronDown,
  Globe2,
  ImageIcon,
  Info,
  LayoutDashboard,
  Mail,
  MapPinned,
  MessageSquare,
  Phone,
  Sparkles,
} from "lucide-react";

type ChildItem = {
  name: string;
  href: string;
  region: string;
};

type ChildServicesItem = {
  name: string;
  href: string;
  service: string;
};

type NavItem = {
  name: string;
  href?: string;
  icon: React.ElementType;
  children?: (ChildItem | ChildServicesItem)[];
};

const REGION_ITEMS: ChildItem[] = [
  { name: "East India", href: "/admin/dashboard/tours", region: "east" },
  { name: "West India", href: "/admin/dashboard/tours", region: "west" },
  { name: "North India", href: "/admin/dashboard/tours", region: "north" },
  { name: "South India", href: "/admin/dashboard/tours", region: "south" },
  { name: "Central India", href: "/admin/dashboard/tours", region: "central" },
  { name: "India - Nepal", href: "/admin/dashboard/tours", region: "india-nepal" },
];

const SERVICE_ITEMS: ChildServicesItem[] = [
  { name: "Tour Packages", href: "/admin/dashboard/services", service: "tour-packages" },
  { name: "Car Rental", href: "/admin/dashboard/services", service: "car-rental" },
  { name: "Flight Tickets", href: "/admin/dashboard/services", service: "flight-tickets" },
  { name: "Train Tickets", href: "/admin/dashboard/services", service: "train-tickets" },
  { name: "Tracking Tour India & Nepal", href: "/admin/dashboard/services", service: "tracking-tour-india-and-nepal" },
];

const navItems: NavItem[] = [
  { name: "Home Hero Images", href: "/admin/dashboard/hero", icon: LayoutDashboard },
  { name: "Home Destinations", href: "/admin/dashboard/destinations", icon: ImageIcon },
  { name: "Tour Packages", icon: MapPinned, children: REGION_ITEMS },
  { name: "Services", icon: Sparkles, children: SERVICE_ITEMS },
  { name: "About Us", href: "/admin/dashboard/about", icon: Info },
  { name: "Contact Us", href: "/admin/dashboard/contact", icon: Phone },
  { name: "Inquiries", href: "/admin/dashboard/leads", icon: Mail },
  { name: "Messages", href: "/admin/dashboard/messages", icon: MessageSquare },
];

const SidebarLink = memo(function SidebarLink({
  href,
  name,
  pathname,
  Icon,
}: {
  href: string;
  name: string;
  pathname: string;
  Icon: React.ElementType;
}) {
  const isActive = pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-2xl border px-4 py-3 transition-colors duration-150 ${
        isActive
          ? "border-indigo-500/30 bg-gradient-to-r from-indigo-500 to-violet-500 text-white"
          : "border-transparent bg-white/[0.02] text-white/75 hover:bg-white/[0.05] hover:text-white"
      }`}
    >
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          isActive ? "bg-white text-black" : "bg-white/[0.05] text-white/80"
        }`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <span className="truncate text-sm font-medium tracking-wide">{name}</span>
    </Link>
  );
});

const DropdownItem = memo(function DropdownItem({
  item,
  isOpen,
  onToggle,
}: {
  item: NavItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const Icon = item.icon;
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeRegion = searchParams.get("region");
  const activeService = searchParams.get("service");

  const hasActiveChild = useMemo(() => {
    if (!item.children) return false;

    return item.children.some((child: any) => {
      if ("region" in child) return child.region === activeRegion;
      if ("service" in child) return child.service === activeService;
      return false;
    });
  }, [item.children, activeRegion, activeService]);

  const handleChildClick = useCallback(
    (child: any) => {
      const baseUrl = child.href;
      const params = new URLSearchParams();

      if ("region" in child) params.set("region", child.region);
      if ("service" in child) params.set("service", child.service);

      router.push(`${baseUrl}?${params.toString()}`);
    },
    [router]
  );

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02]">
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 transition-colors duration-150 ${
          hasActiveChild ? "bg-white/[0.05]" : "hover:bg-white/[0.04]"
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              hasActiveChild ? "bg-white text-black" : "bg-white/[0.05] text-white/80"
            }`}
          >
            <Icon className="h-4 w-4" />
          </div>

          <span className="text-sm font-medium tracking-wide text-white/90">
            {item.name}
          </span>
        </div>

        <ChevronDown
          className={`h-4 w-4 text-white/50 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="space-y-1 px-3 pb-3">
          {item.children?.map((child: any) => {
            const isActive =
              ("region" in child && child.region === activeRegion) ||
              ("service" in child && child.service === activeService);

            return (
              <button
                key={child.name}
                onClick={() => handleChildClick(child)}
                className={`flex w-full rounded-xl px-4 py-3 text-left text-sm transition-colors duration-150 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white"
                    : "text-white/65 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {child.name}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
});

export default function Sidebar() {
  const pathname = usePathname();

  const [openMenus, setOpenMenus] = useState({
    tours: pathname.includes("/admin/dashboard/tours"),
    services: pathname.includes("/admin/dashboard/services"),
  });

  const toggleTours = useCallback(() => {
    setOpenMenus((prev) => ({ ...prev, tours: !prev.tours }));
  }, []);

  const toggleServices = useCallback(() => {
    setOpenMenus((prev) => ({ ...prev, services: !prev.services }));
  }, []);

  return (
    <aside className="sticky top-0 flex h-screen w-[290px] flex-col overflow-hidden border-r border-white/10 bg-[#0B1020] text-white">
      <div className="border-b border-white/10 px-6 py-7">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400">
            <Globe2 className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/45">
              Admin Panel
            </p>
            <h2 className="mt-1 text-lg font-semibold tracking-tight">
              Travel Dashboard
            </h2>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
        {navItems.map((item) => {
          if (item.children) {
            const isTours = item.name === "Tour Packages";

            return (
              <DropdownItem
                key={item.name}
                item={item}
                isOpen={isTours ? openMenus.tours : openMenus.services}
                onToggle={isTours ? toggleTours : toggleServices}
              />
            );
          }

          return (
            <SidebarLink
              key={item.href}
              href={item.href!}
              name={item.name}
              pathname={pathname}
              Icon={item.icon}
            />
          );
        })}
      </nav>

      <div className="border-t border-white/10 p-4">
        <div className="rounded-2xl bg-white/[0.03] p-2">
          <LogoutButton />
        </div>
      </div>
    </aside>
  );
}