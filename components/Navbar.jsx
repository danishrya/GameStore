"use client";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* TOP BAR */}
      <div className="bg-[#0d1f4e] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center gap-3">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="w-[72px] h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
              <span className="text-white/60 text-[10px] font-bold tracking-wider">LOGO</span>
            </div>
          </Link>

          {/* Search */}
          <div className="flex items-center gap-2 bg-white/10 border border-white/20 hover:border-white/40 rounded-full px-4 py-2 flex-1 max-w-sm transition-all duration-200 focus-within:bg-white/15 focus-within:border-[#f5b731]/60">
            <svg className="w-3.5 h-3.5 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              type="text"
              placeholder="Cari top Game..."
              className="bg-transparent outline-none text-white placeholder-white/40 text-xs w-full"
            />
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2 ml-auto">
            <button className="hidden sm:flex items-center gap-1.5 text-white/70 hover:text-white text-xs transition-colors px-2 py-1">
              <span className="text-sm">🌐</span>
              <span className="hidden md:inline">Indonesia</span>
              <span className="text-[9px] opacity-60">▾</span>
            </button>

            {[
              { icon: "🔔", label: "Notif" },
              { icon: "💬", label: "Chat" },
              { icon: "🛒", label: "Keranjang" },
            ].map(({ icon, label }) => (
              <button key={label} title={label}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-sm transition-all duration-200 hover:scale-110 hidden sm:flex">
                {icon}
              </button>
            ))}

            <button className="bg-gradient-to-r from-[#f5b731] to-[#f59e0b] text-[#0d1f4e] font-bold rounded-full px-4 py-1.5 text-xs shadow-lg shadow-yellow-500/20 hover:shadow-yellow-500/40 hover:scale-105 transition-all duration-200">
              Pelanggan
            </button>

            <button className="sm:hidden w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white"
              onClick={() => setMenuOpen(!menuOpen)}>
              <span className="text-base">{menuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB NAV */}
      <div className="bg-[#0f2456] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <nav className="hidden sm:flex items-center gap-1 overflow-x-auto scrollbar-none">
            {[
              { icon: "☰", label: "Category" },
              { icon: "🎮", label: "Game" },
              { icon: "👥", label: "Membership" },
              { icon: "🎉", label: "Event & Promo" },
              { icon: "•••", label: "Lainnya" },
            ].map(({ icon, label }) => (
              <Link key={label} href="#"
                className="flex items-center gap-1.5 text-white/60 hover:text-white text-[11px] font-medium whitespace-nowrap px-3 py-2.5 rounded-md hover:bg-white/10 transition-all duration-200 group">
                <span className="group-hover:scale-110 transition-transform">{icon}</span>
                {label}
              </Link>
            ))}
          </nav>

          {menuOpen && (
            <nav className="sm:hidden flex flex-col py-2 gap-1">
              {[
                { icon: "☰", label: "Category" },
                { icon: "🎮", label: "Game" },
                { icon: "👥", label: "Membership" },
                { icon: "🎉", label: "Event & Promo" },
                { icon: "•••", label: "Lainnya" },
              ].map(({ icon, label }) => (
                <Link key={label} href="#"
                  className="flex items-center gap-2 text-white/70 hover:text-white text-xs px-3 py-2 rounded-md hover:bg-white/10 transition-all">
                  {icon} {label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}