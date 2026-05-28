"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";

const navLinks = [
  { href: "/", label: "Početna" },
  { href: "/vozila", label: "Vozila" },
  { href: "/rezervacije", label: "Rezervacije" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-[#121721] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-10">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="4" width="12" height="7" rx="1.5" stroke="white" strokeWidth="1.4" />
              <path d="M3.5 4V3a1.5 1.5 0 013 0v1" stroke="white" strokeWidth="1.4" strokeLinecap="round" />
              <circle cx="3.5" cy="10" r="1" fill="white" />
              <circle cx="10.5" cy="10" r="1" fill="white" />
            </svg>
          </span>
          <span className="text-white font-semibold text-sm tracking-wide">RentACar</span>
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`relative px-3 py-1 text-sm transition-colors ${
                  active ? "text-blue-400" : "text-gray-400 hover:text-white"
                }`}
              >
                {label}
                {active && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-blue-500 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Auth buttons */}
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => window.location.href = "/prijava"}>

          
            Prijava
          </Button>
          <Button
            variant="primary"
            className="hidden sm:inline-flex"
            onClick={() => window.location.href = "/registracija"}
          >
            Registracija
          </Button>
        </div>
      </div>
    </nav>
  );
}
