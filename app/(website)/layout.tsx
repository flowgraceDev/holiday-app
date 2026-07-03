import Header from "../components/Header";
import Footer from "../components/Footer";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#061826] text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* Top glow */}
        <div className="absolute left-1/2 top-[-250px] h-[900px] w-[900px] -translate-x-1/2 rounded-full bg-sky-500/20 blur-[220px]" />

        {/* Left glow */}
        <div className="absolute -left-52 top-1/2 h-[700px] w-[700px] -translate-y-1/2 rounded-full bg-cyan-400/15 blur-[220px]" />

        {/* Right glow */}
        <div className="absolute -right-52 bottom-[-120px] h-[700px] w-[700px] rounded-full bg-indigo-500/15 blur-[220px]" />

        {/* Orange accent */}
        <div className="absolute right-1/4 top-32 h-[260px] w-[260px] rounded-full bg-orange-400/10 blur-[140px]" />

        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#103B63]/30 via-transparent to-[#020B14]" />
      </div>

      <Header />

      <main className="relative z-10 flex-1 w-full px-4 pt-[120px]">
        {children}
      </main>

      <Footer />
    </div>
  );
}