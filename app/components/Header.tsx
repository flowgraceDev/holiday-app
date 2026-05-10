"use client";

import Link from "next/link";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { cormorant } from "../fonts";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
];

const REGIONS = ["north", "south", "east", "west", "central"] as const;

const SERVICES = [
  { name: "Tour Packages", path: "/services/tour-packages" },
  { name: "Car Rental", path: "/services/car-rental" },
  { name: "Flight Tickets", path: "/services/flight-tickets" },
  { name: "Train Tickets", path: "/services/train-tickets" },
  {
    name: "Tracking Tour India & Nepal",
    path: "/services/tracking-tour-india-and-nepal",
  },
];

type UIState = {
  desktopTours: boolean;
  desktopServices: boolean;
  mobileMenu: boolean;
  mobileTours: boolean;
  mobileServices: boolean;
};

export default function Header() {
  const pathname = usePathname();

  const [ui, setUI] = useState<UIState>({
    desktopTours: false,
    desktopServices: false,
    mobileMenu: false,
    mobileTours: false,
    mobileServices: false,
  });

  const [visible, setVisible] = useState(true);

  const lastScrollY = useRef(0);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const isActive = useCallback((path: string) => pathname === path, [pathname]);

  const toggle = useCallback(
    (key: keyof UIState) => setUI((prev) => ({ ...prev, [key]: !prev[key] })),
    [],
  );

  const toggleTours = useCallback(() => {
    setUI((p) => ({
      ...p,
      desktopTours: !p.desktopTours,
      desktopServices: false,
    }));
  }, []);

  const toggleServices = useCallback(() => {
    setUI((p) => ({
      ...p,
      desktopServices: !p.desktopServices,
      desktopTours: false,
    }));
  }, []);

  const closeAll = useCallback(() => {
    setUI({
      desktopTours: false,
      desktopServices: false,
      mobileMenu: false,
      mobileTours: false,
      mobileServices: false,
    });
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentY = window.scrollY;
          setVisible(!(currentY > lastScrollY.current && currentY > 100));
          lastScrollY.current = currentY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setUI((p) => ({
          ...p,
          desktopTours: false,
          desktopServices: false,
        }));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = ui.mobileMenu ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [ui.mobileMenu]);

  const navLinks = useMemo(
    () =>
      NAV_ITEMS.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          onClick={closeAll}
          className={`relative text-[17px] font-medium transition-colors duration-170 ${
            isActive(item.path)
              ? "text-slate-900"
              : "text-slate-700 hover:text-slate-900"
          }`}
        >
          {item.name}
        </Link>
      )),
    [isActive, closeAll],
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* TOP BAR */}
      <div className="bg-slate-950 text-white text-xs">
        <div className="max-w-7xl mx-auto flex justify-end px-4 py-2">
          <div className="flex items-center gap-2">
            <a className="w-8 h-8 flex items-center justify-center rounded-full bg-emerald-500 text-white">
              <FaWhatsapp />
            </a>

            <a className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-white">
              <FaFacebookF />
            </a>

            <a className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-800 text-white">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* NAVBAR */}
      {/* NAVBAR */}
      <div className="bg-white border-b border-slate-170 shadow-sm h-16 md:h-auto">
        <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-full md:py-4">
          <Link
            href="/"
            onClick={closeAll}
            className={`${cormorant.className} text-3xl md:text-3xl font-semibold text-slate-900 leading-none`}
          >
            TDIPL
          </Link>

          <div ref={dropdownRef} className="hidden md:flex items-center gap-10">
            {navLinks}

            {/* SERVICES */}
            <div className="relative">
              <button
                onClick={toggleServices}
                className="text-[17px] font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Our Services
              </button>

              {ui.desktopServices && (
                <div className="absolute top-12 left-0 w-64 rounded-2xl border border-slate-170 bg-white shadow-xl overflow-hidden">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.name}
                      href={s.path}
                      onClick={closeAll}
                      className="block px-5 py-3 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* TOURS */}
            <div className="relative">
              <button
                onClick={toggleTours}
                className="text-[17px] font-medium text-slate-700 hover:text-slate-900 transition-colors"
              >
                Tours Packages
              </button>

              {ui.desktopTours && (
                <div className="absolute top-12 left-0 w-64 rounded-2xl border border-slate-170 bg-white shadow-xl overflow-hidden">
                  {REGIONS.map((region) => (
                    <Link
                      key={region}
                      href={`/region/${region}`}
                      onClick={closeAll}
                      className="block px-5 py-3 capitalize text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                    >
                      {region} India Tours
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/contact"
              onClick={closeAll}
              className="text-[17px] font-medium text-slate-700 hover:text-slate-900 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => toggle("mobileMenu")}
            className="md:hidden flex items-center justify-center w-12 h-12 rounded-xl border border-slate-300 bg-white text-slate-900 text-3xl shrink-0"
          >
            ☰
          </button>
        </nav>
      </div>

      {/* MOBILE MENU */}
      {ui.mobileMenu && (
        <div className="fixed inset-0 z-[60] bg-white md:hidden">
          <div className="flex items-center justify-between h-16 px-5 border-b border-slate-170">
            <span className="text-xl font-semibold text-slate-900">Menu</span>

            <button
              onClick={() => toggle("mobileMenu")}
              className="flex items-center justify-center w-12 h-12 rounded-xl border border-slate-300 text-slate-900 text-3xl"
            >
              ×
            </button>
          </div>

          <div className="h-[calc(100vh-64px)] overflow-y-auto px-5 py-6 bg-white">
            <div className="flex flex-col gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={closeAll}
                  className={`text-lg font-semibold ${
                    isActive(item.path) ? "text-slate-900" : "text-slate-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {/* SERVICES MOBILE */}
              <div className="border-t border-slate-170 pt-5">
                <button
                  onClick={() => toggle("mobileServices")}
                  className="w-full flex items-center justify-between text-lg font-semibold text-slate-900"
                >
                  <span>Our Services</span>
                  <span className="text-2xl">
                    {ui.mobileServices ? "−" : "+"}
                  </span>
                </button>

                {ui.mobileServices && (
                  <div className="mt-4 flex flex-col rounded-2xl border border-slate-170 overflow-hidden bg-slate-50">
                    {SERVICES.map((s) => (
                      <Link
                        key={s.name}
                        href={s.path}
                        onClick={closeAll}
                        className="px-5 py-4 text-base text-slate-700 border-b border-slate-170 last:border-b-0"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* TOURS MOBILE */}
              <div className="border-t border-slate-170 pt-5">
                <button
                  onClick={() => toggle("mobileTours")}
                  className="w-full flex items-center justify-between text-lg font-semibold text-slate-900"
                >
                  <span>Tours Packages</span>
                  <span className="text-2xl">{ui.mobileTours ? "−" : "+"}</span>
                </button>

                {ui.mobileTours && (
                  <div className="mt-4 flex flex-col rounded-2xl border border-slate-170 overflow-hidden bg-slate-50">
                    {REGIONS.map((r) => (
                      <Link
                        key={r}
                        href={`/region/${r}`}
                        onClick={closeAll}
                        className="px-5 py-4 text-base capitalize text-slate-700 border-b border-slate-170 last:border-b-0"
                      >
                        {r} India Tours
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link href="/contact" onClick={closeAll}>
                <button className="w-full py-4 rounded-2xl bg-slate-900 text-white font-semibold text-base">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
