// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const HEADER_HEIGHT = "pt-[120px]"
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shri Radhe Holidays",
  description: "Best Travel Agency in Delhi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-screen bg-white text-black m-0 p-0">
        <div className="flex flex-col min-h-screen">
          <Header/>
         <main className={`flex-1 w-full block ${HEADER_HEIGHT}`}>
  {children}
</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}