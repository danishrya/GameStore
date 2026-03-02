import Link from "next/link";

const footerLinks = {
  "Produk": ["Top Up Game", "Voucher Game", "Game PC", "Membership"],
  "Bantuan": ["Cara Pembayaran", "FAQ", "Hubungi Kami", "Status Layanan"],
  "Perusahaan": ["Tentang Kami", "Karir", "Blog", "Press"],
};

export default function Footer() {
  return (
    <footer className="bg-[#070f2b] text-white/60 text-xs">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Top section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <div className="w-16 h-7 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center mb-3">
              <span className="text-white/50 text-[9px] font-bold tracking-wider">LOGO</span>
            </div>
            <p className="text-white/40 text-[11px] leading-relaxed">
              Platform top up game terpercaya dengan transaksi cepat dan aman.
            </p>
            <div className="flex gap-2 mt-3">
              {["📘", "📸", "🐦", "▶️"].map((icon, i) => (
                <button key={i} className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-xs transition-colors">
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white/80 font-semibold text-[11px] uppercase tracking-wider mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <Link href="#" className="hover:text-white transition-colors text-[11px]">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-white/30">© 2025 TopUp Game. All rights reserved.</p>
          <div className="flex gap-4 text-[10px]">
            <Link href="#" className="hover:text-white/70 transition-colors">Privasi</Link>
            <Link href="#" className="hover:text-white/70 transition-colors">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}