import Image from "next/image";
// import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";
import {
  cormorant,
} from "../fonts";
export default function Footer() {
  return (
    <footer className="relative text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/footer.jpg"
          alt="footer"
          fill
          className="object-cover opacity-30"
        />
      </div>


      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid md:grid-cols-2 gap-12 pb-14 border-b border-white/10">
          {/* BRAND */}
          <div className="space-y-5 max-w-md">
            <div
              className={`${cormorant.className} text-2xl md:text-3xl font-semibold tracking-wide`}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500">
                Create Moments That Matter
              </span>
            </div>

            <p className="text-white/70 text-sm leading-relaxed">
              Premium travel planning across India with clear itineraries,
              reliable service, and complete support from start to finish.
            </p>

            <Link
              href="/contact"
              className="inline-block mt-2 px-5 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              Plan Your Trip
            </Link>
          </div>

          {/* CONTACT */}
          <div className="space-y-6">
            {/* <h3 className="text-xs uppercase tracking-widest text-white/60">
              Contact
            </h3> */}

            <div className="space-y-4 text-sm text-white/70">
              {/* <div className="flex items-center gap-3">
                <Phone size={16} />
                <span>+91 8679343420</span>
              </div> */}

              {/* <div className="flex items-center gap-3">
                <Mail size={16} />
                <span>vinn4200@gmail.com</span>
              </div> */}

              {/* <div className="flex items-start gap-3">
                <MapPin size={16} className="mt-1" />
                <span>The Ridge, Shimla, Himachal Pradesh, India</span>
              </div> */}
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs text-white/50">
          <p>© 2026. All rights reserved.</p>

          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-white transition">
              Support
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
