'use client'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type TravelCardRootProps = {
  children: React.ReactNode;
};

export function TravelCardRoot({ children }: TravelCardRootProps) {

  const [showHeader, setShowHeader] = useState(true);

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

  const pathname = usePathname();

  if (pathname === "/") {
    return (
      <div className="flex bg-white w-[1307px] h-[66px] rounded-[11px] drop-shadow-md px-4 py-2">{children}</div>
    )
  }
  
  return (
    <div className={`${!showHeader ? 'opacity-0' : ''} transition-all duration-2000 flex bg-white w-[1292px] h-[66px] rounded-[11px] drop-shadow-md px-4 py-2`}>{children}</div>
  )
}