'use client'
import { usePathname } from "next/navigation";

type TravelCardRootProps = {
  children: React.ReactNode;
};

export function TravelCardRoot({ children }: TravelCardRootProps) {

  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <div className="flex bg-white w-[1307px] h-[66px] rounded-[11px] drop-shadow-md px-4 py-2">{children}</div>
    )
  }
  
  return (
    <div className="flex bg-white w-[1292px] h-[66px] rounded-[11px] drop-shadow-md px-4 py-2">{children}</div>
  )
}