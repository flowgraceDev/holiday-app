import Header from "../components/Header";
import Footer from "../components/Footer";
import CovenantOceanBackground from "@/app/particals";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col bg-[#070A12] text-white overflow-hidden">
      {/* Particles */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <CovenantOceanBackground />
      </div>

      {/* Glow Effects */}
      <div className="pointer-events-none fixed inset-0 -z-[5] overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[140px] animate-[pulse_6s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-0 h-[400px] w-[400px] -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px] animate-[pulse_8s_ease-in-out_infinite]" />
      </div>

      <Header />

      <main className="relative z-10 flex-1 w-full pt-[120px] px-4">
        {children}
      </main>

      <Footer />
    </div>
  );
}