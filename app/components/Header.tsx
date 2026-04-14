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
import {
  cinzel,
  playfair,
  cormorant,
  dancing,
  inter,
  manrope,
  poppins,
} from "../fonts";
import { getTours } from "../actions/tours";
const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [tours, setTours] = useState<any[]>([]);
  const [desktopDropdown, setDesktopDropdown] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const isActive = useCallback((path: string) => pathname === path, [pathname]);
  useEffect(() => {
    getTours().then(setTours);
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
          <div className="flex items-center gap-4">
            {/* <a
              href="mailto:info@travel.com"
              className="hidden md:flex items-center gap-2 text-slate-200 hover:text-amber-300 transition"
            >
              <FaEnvelope className="text-amber-300" />
              info@travel.com
            </a> */}

            {/* <a
              href="tel:"
              className="flex items-center gap-2 text-slate-200 hover:text-emerald-400 transition"
            >
              <FaPhoneAlt className="text-emerald-400" />
              +91
            </a> */}
          </div>

          <div className="flex items-center gap-2">
            <a
              // href="https://wa.me/"
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
            {NAV_ITEMS.map((item) => {
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
                <div className="absolute top-12 left-0 w-64 rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">
                  {tours.map((tour) => (
                    <Link
                      key={tour.id}
                      href={`/tours/${tour.slug}`}
                      prefetch={false}
                      className="block px-4 py-3 text-sm hover:bg-slate-50"
                    >
                      {tour.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
              {NAV_ITEMS.map((item) => {
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
                  Tours
                  <span
                    className={`transition ${mobileDropdown ? "rotate-180" : ""}`}
                  >
                    ▾
                  </span>
                </button>

                {mobileDropdown && (
                  <div className="mt-3 pl-4 border-l border-slate-300 space-y-2">
                    {tours.map((tour) => (
                      <Link
                        key={tour.id}
                        href={`/tours/${tour.slug}`}
                        prefetch={false}
                        onClick={() => setMobileMenu(false)}
                        className="block text-sm text-slate-600"
                      >
                        {tour.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
