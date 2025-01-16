'use client'
import Link from "next/link";
import { LogIn } from 'lucide-react'
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const isSearchPage = pathname === "/search";

  return (
    <header className={`h-[60px] w-full flex justify-between items-center px-[100px] ${isSearchPage ? "bg-white" : "bg-transparent"}`}>
      <h1 className="text-xl leading-[26px] font-bold">Infotravel</h1>
      <Link href="/" className="flex text-xs justify-between text-[#698096] font-medium gap-2 items-center">
        <LogIn className="size-4" /> 
        <span>Iniciar Sessao</span>
      </Link>
    </header>
  );
}