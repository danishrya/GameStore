import Navbar from "@/components/Navbar";
import HeroKeunggulan from "@/components/Hero";
import GameSections from "@/components/Gamesections";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f0f2f7] font-sans">
      <Navbar />
      <HeroKeunggulan />
      <GameSections />
      <Footer />
    </main>
  );
}