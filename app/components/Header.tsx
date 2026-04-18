"use client";

import Link from "next/link";
import {
  FaWhatsapp,
  FaFacebookF,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback } from "react";
import { cormorant } from "../fonts";
import { getToursByRegion, Region } from "../lib/supabase/actions/public/tours";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
];

const REGIONS: Region[] = ["north", "south", "east", "west", "central"];

export default function Header() {
  const pathname = usePathname();
  const [toursByRegion, setToursByRegion] = useState<Record<string, any[]>>({});
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const isActive = useCallback((path: string) => pathname === path, [pathname]);

  useEffect(() => {
    const fetchTours = async () => {
      const results = await Promise.all(
        REGIONS.map((region) => getToursByRegion(region)),
      );

      const grouped: Record<string, any[]> = {};

      REGIONS.forEach((region, i) => {
        const res = results[i];
        grouped[region] = res.success ? res.data : [];
      });

      setToursByRegion(grouped);
    };

    fetchTours();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setVisible(!(currentY > lastScrollY.current && currentY > 100));
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenu(false);
    setMobileDropdown(false);
    setDesktopDropdown(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDesktopDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenu ? "hidden" : "";
  }, [mobileMenu]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-slate-950 text-white text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-4"></div>

          <div className="flex items-center gap-2">
            <a
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-600 transition"
            >
              <FaWhatsapp />
            </a>

            <a
              href="https://facebook.com"
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-blue-600 transition"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-pink-500 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className="backdrop-blur-xl bg-white/95 border-b border-slate-200 shadow-sm">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 py-4">
          <Link
            href="/"
            className={`${cormorant.className} text-2xl md:text-3xl font-semibold tracking-wide text-slate-900 hover:text-slate-700 transition`}
          >
            Discover. Plan. Celebrate.
          </Link>

          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-600">
            {NAV_ITEMS.slice(0, 2).map((item) => {
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className="relative group"
                >
                  <span
                    className={`transition ${
                      active
                        ? "text-slate-900"
                        : "text-slate-600 group-hover:text-slate-900"
                    }`}
                  >
                    {item.name}
                  </span>

                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-slate-900 transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}

            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setDesktopDropdown((p) => !p)}
                className="text-slate-600 hover:text-slate-900 transition"
              >
                Tours 
              </button>
              

              {desktopDropdown && (
                <div className="absolute top-12 left-0 w-64 rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur-md shadow-[0_10px_40px_rgba(2,6,23,0.08)] overflow-hidden">
                  <div className="py-2">
                    {REGIONS.map((region) => (
                      <Link
                        key={region}
                        href={`/region/${region}`}
                        className="group relative flex items-center justify-between px-5 py-3 text-sm text-slate-700 capitalize transition-all duration-200"
                      >
                        <span className="relative z-10 group-hover:text-slate-900 transition-colors">
                          {region} India Tours
                        </span>

                        <span className="relative z-10 opacity-0 translate-x-[-6px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 text-slate-400">
                          →
                        </span>

                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 rounded-lg bg-gradient-to-r from-slate-50 via-white to-slate-50" />

                        <span className="absolute left-0 top-0 h-full w-[3px] bg-slate-900 scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top rounded-r-full" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/contact" className="relative group">
              <span
                className={`transition ${
                  isActive("/contact")
                    ? "text-slate-900"
                    : "text-slate-600 group-hover:text-slate-900"
                }`}
              >
                Contact Us
              </span>

              <span
                className={`absolute left-0 -bottom-1 h-[2px] bg-slate-900 transition-all duration-300 ${
                  isActive("/contact") ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          </div>

          <div className="hidden md:block">
            <Link
              href="/contact"
              className="inline-block px-6 py-2 rounded-full bg-slate-900 text-white text-sm font-medium shadow-md hover:shadow-xl transition"
            >
              Book Now
            </Link>
          </div>

          <button
            onClick={() => setMobileMenu(true)}
            className="md:hidden text-2xl text-slate-900"
          >
            ☰
          </button>
        </nav>
      </div>

      {mobileMenu && (
        <div className="fixed inset-0 z-[60] bg-white">
          <div className="flex items-center justify-between px-5 py-4 border-b">
            <span className="font-semibold text-slate-900">Menu</span>
            <button onClick={() => setMobileMenu(false)} className="text-2xl">
              ×
            </button>
          </div>

          <div className="px-5 py-6 space-y-6 bg-white">
            <div className="flex flex-col gap-5">
              {NAV_ITEMS.slice(0, 2).map((item) => {
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => setMobileMenu(false)}
                    className={`relative text-base font-medium ${
                      active ? "text-slate-900" : "text-slate-700"
                    }`}
                  >
                    {item.name}

                    {active && (
                      <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-slate-900" />
                    )}
                  </Link>
                );
              })}

              <div>
                <button
                  onClick={() => setMobileDropdown((p) => !p)}
                  className="flex justify-between w-full text-slate-700 font-medium"
                >
                  Tours ↓
                  <span
                    className={`transition ${mobileDropdown ? "rotate-180" : ""}`}
                  >
                    ▾
                  </span>
                </button>

                {mobileDropdown && (
                  <div className="mt-4 rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur-md shadow-sm overflow-hidden">
                    <div className="py-2">
                      {REGIONS.map((region) => (
                        <Link
                          key={region}
                          href={`/region/${region}`}
                          onClick={() => setMobileMenu(false)}
                          className="group relative flex items-center justify-between px-4 py-3 text-sm text-slate-700 capitalize active:bg-slate-100 transition"
                        >
                          <span className="relative z-10 group-active:text-slate-900">
                            {region} India Tours
                          </span>

                          <span className="relative z-10 opacity-0 translate-x-[-6px] group-active:opacity-100 group-active:translate-x-0 transition-all duration-200 text-slate-400">
                            →
                          </span>

                          <span className="absolute inset-0 opacity-0 group-active:opacity-100 transition duration-200 rounded-lg bg-gradient-to-r from-slate-50 via-white to-slate-50" />

                          <span className="absolute left-0 top-0 h-full w-[3px] bg-slate-900 scale-y-0 group-active:scale-y-100 transition-transform duration-200 origin-top rounded-r-full" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/contact"
                onClick={() => setMobileMenu(false)}
                className="text-base font-medium text-slate-700"
              >
                Contact Us
              </Link>
            </div>

            <Link href="/contact">
              <button className="w-full py-3 rounded-2xl bg-slate-900 text-white font-medium">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
