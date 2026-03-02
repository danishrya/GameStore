"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const SLIDES = [
  { id: 0, bg: "linear-gradient(135deg, #1a3a6e 0%, #0d1f4e 60%, #162d5c 100%)", accent: "#f5b731", label: "Banner Slide 1" },
  { id: 1, bg: "linear-gradient(135deg, #0d3a2e 0%, #0a1f18 60%, #0d3a2e 100%)", accent: "#34d399", label: "Banner Slide 2" },
  { id: 2, bg: "linear-gradient(135deg, #3a0d2e 0%, #1f0a18 60%, #2e0d25 100%)", accent: "#f472b6", label: "Banner Slide 3" },
  { id: 3, bg: "linear-gradient(135deg, #2e200d 0%, #1a1005 60%, #2e200d 100%)", accent: "#fb923c", label: "Banner Slide 4" },
];

const KEUNGGULAN = [
  { icon: "/icon/time.ico", title: "Isi Ulang Instan", desc: "Proses cepat & mudah", color: "color-white", border: "border-blue-500/30",bg:'bg-white' },
  { icon: "/icon/pay.ico", title: "Metode Pembayaran...", desc: "Berbagai pilihan bayar", color: "color-white", border: "border-emerald-500/30",bg:'bg-white' },
  { icon: "/icon/ceklis.ico", title: "Top up paling aman", desc: "Transaksi terjamin", color: "color-white", border: "border-yellow-500/30",bg:'bg-white' },
  { icon: "/icon/vector.ico", title: "Dapatkan hadiah setiap...", desc: "Hadiah menarik tiap hari", color: "color-white", border: "border-pink-500/30",bg:'bg-white' },
  { icon: "/icon/phone.ico", title: "Banyak pilihan game", desc: "Ribuan game tersedia", color: "color-white", border: "border-purple-500/30",bg:'bg-white' },
];

export default function HeroKeunggulan() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);
  const mouseStartX = useRef(null);
  const autoRef = useRef(null);

  const startAuto = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 4000);
  };

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoRef.current);
  }, []);

  const goTo = (i) => {
    setCurrent(i);
    startAuto();
  };

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);
  const next = () => goTo((current + 1) % SLIDES.length);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  const onMouseDown = (e) => {
    mouseStartX.current = e.clientX;
  };

  const onMouseUp = (e) => {
    if (mouseStartX.current === null) return;
    const diff = mouseStartX.current - e.clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    mouseStartX.current = null;
  };

  const slide = SLIDES[current];

  return (
    <div className="max-w-7xl mx-auto px-4">

      {/* HERO BANNER */}
      <div className="mt-4 mb-5">
        <div
          className="relative overflow-hidden rounded-2xl cursor-grab active:cursor-grabbing select-none"
          style={{ height: "clamp(180px, 28vw, 340px)" }}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
        >
          {SLIDES.map((s, i) => (
            <div
              key={s.id}
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: s.bg,
                opacity: i === current ? 1 : 0,
                pointerEvents: i === current ? "auto" : "none",
              }}
            >
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className="absolute w-72 h-72 rounded-full blur-3xl opacity-20"
                  style={{ background: s.accent, top: "5%", left: "25%" }}
                />
                <div
                  className="absolute w-44 h-44 rounded-full blur-2xl opacity-15"
                  style={{ background: s.accent, bottom: "10%", right: "10%" }}
                />
                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                  }}
                />
              </div>

              <div className="absolute bottom-12 left-6">
                <span className="text-white/20 text-[10px] font-mono tracking-widest">
                  {s.label}
                </span>
              </div>
            </div>
          ))}

          <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white text-xl flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm z-10">‹</button>
          <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 hover:bg-black/50 text-white text-xl flex items-center justify-center transition-all hover:scale-110 backdrop-blur-sm z-10">›</button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === current ? 20 : 6,
                  height: 6,
                  background:
                    i === current
                      ? slide.accent
                      : "rgba(255,255,255,0.35)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* KEUNGGULAN */}
      <div className="mb-4 bg-[#203E6E] rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 pt-5 pb-3 border-b border-gray-100">
          <h2 className="text-center text-sm font-bold text-white tracking-wide">
            Keunggulan Kami
          </h2>
        </div>

        <div className="p-4">
          {[KEUNGGULAN.slice(0, 3), KEUNGGULAN.slice(3)].map((group, gi) => (
            <div
              key={gi}
              className={`grid ${
                gi === 0
                  ? "grid-cols-1 sm:grid-cols-3 mb-3"
                  : "grid-cols-1 sm:grid-cols-2 sm:max-w-[66%] sm:mx-auto"
              } gap-3`}
            >
              {group.map((k) => (
                <div
                  key={k.title}
                  className={`flex items-center gap-3 rounded-xl p-3  ${k.bg} ${k.color} border ${k.border} hover:scale-[1.02] transition-transform duration-200`}
                >
                  <div className="w-9 h-9 rounded-lg bg-white/80 flex items-center justify-center shadow-sm">
                    {typeof k.icon === "string" &&
                    k.icon.startsWith("/") ? (
                      <Image
                        src={k.icon}
                        alt={k.title}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                    ) : (
                      <span className="text-lg">{k.icon}</span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#0d1f4e] truncate">
                      {k.title}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate">
                      {k.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}