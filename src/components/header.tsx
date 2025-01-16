"use client";
import Link from "next/link";
import { Home, LogIn } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";

export function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isSearchPage = pathname === "/search";

  return (
    <header
      className={`h-[60px] w-full flex justify-between items-center px-[100px] ${
        isSearchPage ? "bg-white" : "bg-transparent"
      }`}
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
