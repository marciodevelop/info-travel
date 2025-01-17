"use client";
import Link from "next/link";
import { Home, LogIn } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isSearchPage = pathname.includes("/search");

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 h-[60px] flex justify-between items-center px-[100px] 
        ${
          showHeader ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300
      ${isSearchPage ? "bg-white" : "bg-transparent"}`}
    >
      <h1 className="text-xl leading-[26px] font-bold">Infotravel</h1>

      {isSearchPage && (
        <Link
          href={`/?${searchParams.toString()}`}
          className="ml-auto mr-[18px] flex text-xs justify-between text-[#698096] font-medium gap-2 items-center"
        >
          <Home className="size-4" />
          <span>Página Inicial</span>
        </Link>
      )}

      <Link
        href={`/?${searchParams.toString()}`}
        className="flex text-xs justify-between text-[#698096] font-medium gap-2 items-center"
      >
        <LogIn className="size-4" />
        <span>Iniciar Sessao</span>
      </Link>
    </header>
  );
}
