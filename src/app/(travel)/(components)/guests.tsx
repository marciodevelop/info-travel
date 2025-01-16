"use client";
import { TravelCard } from "@/components/forms/travel-card";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Minus, Plus } from "lucide-react";
import { redirect, usePathname, useRouter, useSearchParams } from "next/navigation";
import { forwardRef, use, useEffect, useImperativeHandle, useState } from "react";


export const Guests = forwardRef((_, ref: any) => {
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const [rooms, setRooms] = useState(1);

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  function handleAdultsIncrement() {
    setAdults((state) => state + 1);
  }

  function handleAdultsDecrement() {
    if (adults === 1) return;
    setAdults((state) => state - 1);
  }

  function handleKidsIncrement() {
    setKids((state) => state + 1);
  }

  function handleKidsDecrement() {
    if (kids === 0) return;
    setKids((state) => state - 1);
  }

  function handleRoomsIncrement() {
    setRooms((state) => state + 1);
  }

  function handleRoomsDecrement() {
    if (rooms === 1) return;
    setRooms((state) => state - 1);
  }

  function handleRedirectSearchPage() {
    redirect('/search');
  }

  useImperativeHandle(ref, () => {
    return {
      getAdults: () => adults,
      getKids: () => kids,
      getRooms: () => rooms,
    };
  });

  useEffect(() => {
    const query = new URLSearchParams(searchParams);
    query.set("adults", adults.toString());
    query.set("kids", kids.toString());
    query.set("rooms", rooms.toString());

    replace(`${pathname}?${query.toString()}`, {
      scroll: false,
    });
  }, [adults, kids, rooms]);

  return (
    <div className="flex gap-20 items-center">
      <TravelCard.Section
        className="border-l border-l-[#E3EBF3] mb-auto"
        icon="Users"
        title="Hóspedes"
      >
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-xs">teste</button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="mt-7 border-0 rounded-xl w-[177px]"
          >
            <div className="absolute size-0 border-[7px] ml-4 mt-[-14px] border-b-white border-l-transparent border-r-transparent border-t-transparent" />
            <div className="flex flex-col justify-between bg-white p-4 rounded-lg gap-4">
              <div className="flex w-full justify-between items-center py-4 border-b border-b-[#E3EBF3]">
                <span className="text-xs">Adultos</span>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={handleAdultsIncrement}
                    className="text-xs flex justify-center items-center size-6 rounded-full bg-[#E3EBF3]"
                  >
                    <Plus size="16px" />
                  </button>
                  <span className="text-xs font-semibold w-3">{adults}</span>
                  <button
                    onClick={handleAdultsDecrement}
                    className="text-xs flex justify-center items-center size-6 rounded-full bg-[#E3EBF3]"
                  >
                    <Minus size="16px" />
                  </button>
                </div>
              </div>
              <div className="flex w-full justify-between items-center py-4 border-b border-b-[#E3EBF3]">
                <span className="text-xs">Crianças</span>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={handleKidsIncrement}
                    className="text-xs flex justify-center items-center size-6 rounded-full bg-[#E3EBF3]"
                  >
                    <Plus size="16px" />
                  </button>
                  <span className="text-xs font-semibold w-3">{kids}</span>
                  <button
                    onClick={handleKidsDecrement}
                    className="text-xs flex justify-center items-center size-6 rounded-full bg-[#E3EBF3]"
                  >
                    <Minus size="16px" />
                  </button>
                </div>
              </div>

              <div className="flex w-full justify-between items-center py-4 border-b border-b-[#E3EBF3]">
                <span className="text-xs">Quartos</span>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={handleRoomsIncrement}
                    className="text-xs flex justify-center items-center size-6 rounded-full bg-[#E3EBF3]"
                  >
                    <Plus size="16px" />
                  </button>
                  <span className="text-xs font-semibold w-3">{rooms}</span>
                  <button
                    onClick={handleRoomsDecrement}
                    className="text-xs flex justify-center items-center size-6 rounded-full bg-[#E3EBF3]"
                  >
                    <Minus size="16px" />
                  </button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </TravelCard.Section>
      <Button onClick={handleRedirectSearchPage} className="rounded-[50px]">Pesquisar</Button>
    </div>
  );
});
