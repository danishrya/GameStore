"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";

// ─── Placeholder components ───────────────────────────────
function GameThumb({ dark = false, style = {} }) {
  return (
    <div
      className="w-full rounded-xl"
      style={{
        aspectRatio: "1",
        backgroundColor: dark ? "#3d4f6d" : "#d0d4dc",
        backgroundImage: dark
          ? "linear-gradient(45deg,#334060 25%,transparent 25%),linear-gradient(-45deg,#334060 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#334060 75%),linear-gradient(-45deg,transparent 75%,#334060 75%)"
          : "linear-gradient(45deg,#c4c8d0 25%,transparent 25%),linear-gradient(-45deg,#c4c8d0 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#c4c8d0 75%),linear-gradient(-45deg,transparent 75%,#c4c8d0 75%)",
        backgroundSize: "12px 12px",
        backgroundPosition: "0 0,0 6px,6px -6px,-6px 0px",
        ...style,
      }}
    />
  );
}

function VoucherThumb() {
  return (
    <div
      className="w-full rounded-xl"
      style={{
        height: 90,
        backgroundColor: "#3d4f6d",
        backgroundImage: "linear-gradient(45deg,#334060 25%,transparent 25%),linear-gradient(-45deg,#334060 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#334060 75%),linear-gradient(-45deg,transparent 75%,#334060 75%)",
        backgroundSize: "12px 12px",
        backgroundPosition: "0 0,0 6px,6px -6px,-6px 0px",
      }}
    />
  );
}

// ─── Horizontal scroll hook ───────────────────────────────
function useAutoScroll(speed = 0.5) {
  const ref = useRef(null);
  const animRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const pausedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let pos = 0;
    const animate = () => {
      if (!pausedRef.current) {
        pos += speed;
        if (pos >= el.scrollWidth / 2) pos = 0;
        el.scrollLeft = pos;
      }
      animRef.current = requestAnimationFrame(animate);
    };
    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [speed]);

  const pause = () => { pausedRef.current = true; setIsPaused(true); };
  const resume = () => { pausedRef.current = false; setIsPaused(false); };

  return { ref, pause, resume, isPaused };
}

// ─── Section header ───────────────────────────────────────
function SectionHeader({ title, dark = false }) {
  return (
    <div className="flex items-center justify-between mb-4 px-1">
      <h2 className={`text-sm font-bold tracking-wide ${dark ? "text-white" : "text-[#0d1f4e]"}`}>
        {title}
      </h2>
      <Link href="#" className={`text-xs font-medium transition-colors ${dark ? "text-[#f5b731] hover:text-yellow-300" : "text-blue-600 hover:text-blue-800"}`}>
        Lihat Semua ›
      </Link>
    </div>
  );
}

// ─── Scroll row with arrow buttons ───────────────────────
function ScrollRow({ children, dark = false, autoScroll = false, scrollSpeed = 0.4 }) {
  const manualRef = useRef(null);
  const auto = useAutoScroll(scrollSpeed);
  const ref = autoScroll ? auto.ref : manualRef;

  const scroll = (dir) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  return (
    <div className="relative group"
      onMouseEnter={autoScroll ? auto.pause : undefined}
      onMouseLeave={autoScroll ? auto.resume : undefined}
      onTouchStart={autoScroll ? auto.pause : undefined}
      onTouchEnd={autoScroll ? auto.resume : undefined}>
      {/* Left arrow */}
      <button onClick={() => scroll(-1)}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-10 w-8 h-8 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110
          ${dark ? "bg-white/20 text-white hover:bg-white/30" : "bg-white text-[#0d1f4e] hover:bg-gray-100"}`}>
        ‹
      </button>

      {/* Scrollable track */}
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto pb-2 scroll-smooth"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children}
      </div>

      {/* Right arrow */}
      <button onClick={() => scroll(1)}
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-10 w-8 h-8 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110
          ${dark ? "bg-white/20 text-white hover:bg-white/30" : "bg-white text-[#0d1f4e] hover:bg-gray-100"}`}>
        ›
      </button>

      {/* Fade edges */}
      <div className={`absolute left-0 top-0 w-8 h-full pointer-events-none ${dark ? "bg-gradient-to-r from-[#0d1f4e] to-transparent" : "bg-gradient-to-r from-[#f0f2f7] to-transparent"}`} />
      <div className={`absolute right-0 top-0 w-8 h-full pointer-events-none ${dark ? "bg-gradient-to-l from-[#0d1f4e] to-transparent" : "bg-gradient-to-l from-[#f0f2f7] to-transparent"}`} />
    </div>
  );
}

// ─── POPULAR GAME ─────────────────────────────────────────
const popularGames = Array(14).fill(null).map((_, i) => ({
  id: i + 1, name: "Nama Game", price: "Rp 5.000",
}));

function PopularGame() {
  return (
    <section className="max-w-7xl mx-auto px-4 mb-2">
      <SectionHeader title="🔥 Popular Game" />
      <ScrollRow autoScroll scrollSpeed={0.35}>
        {/* Duplicate for seamless loop */}
        {[...popularGames, ...popularGames].map((game, i) => (
          <Link key={i} href={`/game/${game.id}`}
            className="flex-shrink-0 w-[140px] sm:w-[160px] group/card">
            <div className="relative overflow-hidden rounded-xl bg-white shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all duration-300 hover:-translate-y-1">
              <GameThumb />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-xl" />
              <div className="absolute bottom-0 left-0 right-0 p-2 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300">
                <span className="text-white text-[10px] font-bold drop-shadow">Top Up →</span>
              </div>
            </div>
            <p className="text-xs text-gray-600 mt-1.5 truncate font-medium">{game.name}</p>
            <p className="text-xs text-[#0d1f4e] font-bold">{game.price}</p>
          </Link>
        ))}
      </ScrollRow>
    </section>
  );
}

// ─── GAME PC ──────────────────────────────────────────────
const pcGames = Array(12).fill(null).map((_, i) => ({
  id: i + 1, name: "Nama Game", price: "Rp 3.000",
}));

function GamePC() {
  return (
    <section className="bg-gradient-to-b from-[#0d1f4e] to-[#0a1840] py-6 mt-3">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="🖥️ Game PC" dark />
        <ScrollRow dark autoScroll scrollSpeed={0.5}>
          {[...pcGames, ...pcGames].map((game, i) => (
            <Link key={i} href={`/game/pc/${game.id}`}
              className="flex-shrink-0 w-[120px] sm:w-[140px] group/card">
              <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-[#f5b731]/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#f5b731]/10">
                <GameThumb dark />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f5b731]/20 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 rounded-xl" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                  <span className="bg-[#f5b731] text-[#0d1f4e] text-[9px] font-bold px-2 py-0.5 rounded-full shadow">Beli →</span>
                </div>
              </div>
              <p className="text-[11px] text-white/70 mt-1.5 truncate group-hover/card:text-white transition-colors">{game.name}</p>
              <p className="text-[11px] text-[#f5b731] font-bold">{game.price}</p>
            </Link>
          ))}
        </ScrollRow>
      </div>
    </section>
  );
}

// ─── VOUCHER GAME ─────────────────────────────────────────
const vouchers = Array(10).fill(null).map((_, i) => ({
  id: i + 1, name: "Nama Voucher", price: "Rp 10.000",
}));

function VoucherGame() {
  return (
    <section className="bg-gradient-to-b from-[#0a1840] to-[#0d1f4e] py-6">
      <div className="max-w-7xl mx-auto px-4">
        <SectionHeader title="🎟️ Voucher Game" dark />
        <ScrollRow dark autoScroll scrollSpeed={0.3}>
          {[...vouchers, ...vouchers].map((v, i) => (
            <Link key={i} href={`/voucher/${v.id}`}
              className="flex-shrink-0 w-[160px] sm:w-[190px] group/card">
              <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-[#f5b731]/50 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
                <VoucherThumb />
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/card:translate-x-full transition-transform duration-700 ease-in-out" />
              </div>
              <p className="text-[11px] text-white/70 mt-1.5 truncate group-hover/card:text-white transition-colors">{v.name}</p>
              <p className="text-[11px] text-[#f5b731] font-bold">{v.price}</p>
            </Link>
          ))}
        </ScrollRow>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────
const faqData = [
  { q: "Isi Topik", a: "Konten jawaban FAQ akan ditampilkan di sini." },
  { q: "Isi Text", a: "Konten jawaban FAQ akan ditampilkan di sini." },
  { q: "Isi Text", a: "Konten jawaban FAQ akan ditampilkan di sini." },
  { q: "Isi Text", a: "Konten jawaban FAQ akan ditampilkan di sini." },
];

function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="bg-[#0d1f4e] border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-white text-sm font-bold tracking-widest uppercase mb-6 opacity-90">
          FAQ
        </h2>
        <div className="flex flex-col gap-2 max-w-2xl mx-auto">
          {faqData.map((item, i) => (
            <div key={i}
              className="rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-colors">
              <button onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors text-left">
                <span className="flex items-center gap-2 text-white text-xs font-medium">
                  <span className="text-[#f5b731]">▶</span>
                  {item.q}
                </span>
                <span className={`text-white/50 text-xs transition-transform duration-300 ${open === i ? "rotate-180" : ""}`}>▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-32" : "max-h-0"}`}>
                <p className="px-4 py-3 text-white/60 text-xs leading-relaxed border-t border-white/10">
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Export ───────────────────────────────────────────────
export default function GameSections() {
  return (
    <>
      <PopularGame />
      <GamePC />
      <VoucherGame />
      <FAQ />
    </>
  );
}