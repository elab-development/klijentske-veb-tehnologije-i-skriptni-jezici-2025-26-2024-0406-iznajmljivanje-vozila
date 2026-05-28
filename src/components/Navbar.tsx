"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CircleUserRound, LogOut } from "lucide-react";
import Button from "./Button";
import useLocalStorage from "@/hooks/useLocalStorage";

const publicLinks = [
  { href: "/", label: "Početna" },
  { href: "/vozila", label: "Vozila" },
];
const authLinks = [
  { href: "/rezervacije", label: "Rezervacije" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userId, , removeUserId]     = useLocalStorage<number | null>("auth_userId", null);
  const [username, , removeUsername] = useLocalStorage<string | null>("auth_username", null);

  const logout = () => {
    removeUserId();
    removeUsername();
    router.push("/");
  };

  return (
    <nav className="w-full bg-[#121721] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-10">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="w-7 h-7 rounded-md bg-blue-600 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect
                x="1"
                y="4"
                width="12"
                height="7"
                rx="1.5"
                stroke="white"
                strokeWidth="1.4"
              />
              <path
                d="M3.5 4V3a1.5 1.5 0 013 0v1"
                stroke="white"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <circle cx="3.5" cy="10" r="1" fill="white" />
              <circle cx="10.5" cy="10" r="1" fill="white" />
            </svg>
          </span>
          <span className="text-white font-semibold text-sm tracking-wide">
            RentACar
          </span>
        </Link>

        <div className="flex items-center gap-1">
          {[...publicLinks, ...(userId ? authLinks : [])].map(({ href, label }) => {
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

        <div className="ml-auto flex items-center gap-2">
          {userId ? (
            <>
              <Link href="/profil" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
                <CircleUserRound size={20} />
                <span className="text-sm hidden sm:block">{username}</span>
              </Link>
              <button
                onClick={logout}
                className="ml-2 text-gray-500 hover:text-red-400 transition-colors cursor-pointer"
                title="Odjavi se"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => router.push("/prijava")}>
                Prijava
              </Button>
              <Button variant="primary" className="hidden sm:inline-flex" onClick={() => router.push("/registracija")}>
                Registracija
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
