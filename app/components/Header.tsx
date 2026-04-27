"use client";

import Link from "next/link";
import { FaWhatsapp, FaFacebookF, FaInstagram } from "react-icons/fa";
import { usePathname } from "next/navigation";
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { cormorant } from "../fonts";
import { getToursByRegion, Region } from "../lib/supabase/actions/public/tours";

const NAV_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
];

const REGIONS: Region[] = ["north", "south", "east", "west", "central"];

const SERVICES = [
  { name: "Tour Packages", path: "/services/tour-packages" },
  { name: "Car Rental", path: "/services/car-rental" },
  { name: "Flight Tickets", path: "/services/flight-tickets" },
  { name: "Train Tickets", path: "/services/train-tickets" },
  { name: "Tracking Tour India & Nepal", path: "/services/tracking-tour-india-and-nepal" },
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

  const isActive = useCallback(
    (path: string) => pathname === path,
    [pathname]
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

  const toggle = useCallback(
    (key: keyof UIState) =>
      setUI((prev) => ({ ...prev, [key]: !prev[key] })),
    []
  );

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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = ui.mobileMenu ? "hidden" : "";
  }, [ui.mobileMenu]);

  useEffect(() => {
    const fetchTours = async () => {
      await Promise.all(REGIONS.map((r) => getToursByRegion(r)));
    };
    fetchTours();
  }, []);

  const navLinks = useMemo(
    () =>
      NAV_ITEMS.map((item) => (
        <Link key={item.path} href={item.path} className="relative group">
          <span
            className={`${
              isActive(item.path)
                ? "text-slate-900"
                : "group-hover:text-slate-900"
            }`}
          >
            {item.name}
          </span>
        </Link>
      )),
    [isActive]
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-slate-950 text-white text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-end px-4 py-2">
          <div className="flex items-center gap-2">
            <a className="w-9 h-9 flex items-center justify-center rounded-full bg-emerald-500 hover:bg-emerald-600 transition">
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
            className={`${cormorant.className} text-2xl md:text-3xl font-semibold tracking-wide text-slate-900`}
          >
            Discover. Plan. Celebrate.
          </Link>

          <div
            ref={dropdownRef}
            className="hidden md:flex items-center gap-10 text-sm font-medium text-slate-600"
          >
            {navLinks}

            <div className="relative">
              <button
                onClick={toggleServices}
                className="hover:text-slate-900"
              >
                Our Services
              </button>

              {ui.desktopServices && (
                <div className="absolute top-12 left-0 w-64 rounded-2xl border bg-white shadow overflow-hidden">
                  {SERVICES.map((s) => (
                    <Link
                      key={s.name}
                      href={s.path}
                      onClick={closeAll}
                      className="block px-5 py-3 hover:bg-slate-50"
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={toggleTours}
                className="hover:text-slate-900"
              >
                Tours
              </button>

              {ui.desktopTours && (
                <div className="absolute top-12 left-0 w-64 rounded-2xl border bg-white shadow overflow-hidden">
                  {REGIONS.map((region) => (
                    <Link
                      key={region}
                      href={`/region/${region}`}
                      onClick={closeAll}
                      className="block px-5 py-3 capitalize hover:bg-slate-50"
                    >
                      {region} India Tours
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/contact">Contact Us</Link>
          </div>

          <button
            onClick={() => toggle("mobileMenu")}
            className="md:hidden text-2xl"
          >
            ☰
          </button>
        </nav>
      </div>

      {ui.mobileMenu && (
        <div className="fixed inset-0 z-[60] bg-white">
          <div className="flex justify-between p-4 border-b">
            <span>Menu</span>
            <button onClick={() => toggle("mobileMenu")}>×</button>
          </div>

          <div className="p-5 space-y-5">
            {navLinks}

            <div>
              <button onClick={() => toggle("mobileServices")}>
                Our Services
              </button>
              {ui.mobileServices &&
                SERVICES.map((s) => (
                  <Link
                    key={s.name}
                    href={s.path}
                    onClick={closeAll}
                    className="block pl-4"
                  >
                    {s.name}
                  </Link>
                ))}
            </div>

            <div>
              <button onClick={() => toggle("mobileTours")}>Tours</button>
              {ui.mobileTours &&
                REGIONS.map((r) => (
                  <Link
                    key={r}
                    href={`/region/${r}`}
                    onClick={closeAll}
                    className="block pl-4"
                  >
                    {r}
                  </Link>
                ))}
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