"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";

const NO_CHROME = ["/prijava", "/registracija"];

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const show = !NO_CHROME.includes(pathname);

  return (
    <>
      {show && <Navbar />}
      {children}
      {show && <Footer />}
    </>
  );
}
