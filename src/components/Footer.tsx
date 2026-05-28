"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Početna" },
  { href: "/vozila", label: "Vozila" },
  { href: "/rezervacije", label: "Rezervacije" },
];

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="w-full bg-[#121721] border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center">
        {/* Brand */}
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">RentACar</p>
          <p className="text-gray-500 text-xs mt-0.5">
            © {new Date().getFullYear()} RentACar. Sva prava zadržana.
          </p>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`text-sm transition-colors ${
                  active ? "text-blue-400" : "text-gray-400 hover:text-white"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

        <div className="flex-1" />
      </div>
    </footer>
  );
}
