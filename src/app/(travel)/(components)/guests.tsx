"use client";
import { TravelCard } from "@/components/forms/travel-card";
import { GuestSection } from "@/components/guest-section";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

type guestSectionRef = {
  amount: number;
};

export function Guests() {
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const searchParams = useSearchParams();

  const adultsRef = useRef<guestSectionRef>(null);
  const kidsRef = useRef<guestSectionRef>(null);
  const roomsRef = useRef<guestSectionRef>(null);

  const adults = getParamValue("adults", 1);
  const kids = getParamValue("kids", 0);
  const rooms = getParamValue("rooms", 1);

  const isSearchPage = pathname === "/search";

  function getParamValue(param: string, defaultValue: number) {
    const value = searchParams.get(param);
    return value ? Number(value) : defaultValue;
  }

  function handleRedirectSearchPage() {
    push(`/search?${searchParams.toString()}`, { scroll: false });
  }

  function getValuesSection() {
    const query = new URLSearchParams(searchParams);

    if (!adultsRef.current && !kidsRef.current && !roomsRef.current) return;

    if (adultsRef.current) {
      query.set("adults", adultsRef.current.amount.toString());
    }

    if (kidsRef.current) {
      query.set("kids", kidsRef.current.amount.toString());
    }

    if (roomsRef.current) {
      query.set("rooms", roomsRef.current.amount.toString());
    }

    replace(`${pathname}?${query.toString()}`, { scroll: false });
  }

  return (
    <div className="flex w-full items-center">
      <TravelCard.Section
        className="border-l border-l-[#E3EBF3] mb-auto"
        icon="Users"
        title="Hóspedes"
      >
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-xs font-semibold">
              {adults} Adultos, {rooms} Quartos
            </button>
          </PopoverTrigger>
          <PopoverContent
            align="start"
            className="mt-6 border-0 rounded-xl w-[177px] flex flex-col gap-2"
          >
            <div className="absolute size-0 border-[7px] ml-4 mt-[-30px] border-b-white border-l-transparent border-r-transparent border-t-transparent" />
            <div className="flex flex-col justify-between bg-white rounded-lg gap-4">
              <GuestSection ref={adultsRef} defaltValue={Number(adults)} title="Adultos" lowerValue={1} />
              <GuestSection ref={kidsRef} defaltValue={Number(kids)} title="Crianças" lowerValue={0} />
              <GuestSection ref={roomsRef} defaltValue={Number(rooms)} title="Quartos" lowerValue={1} />
            </div>
            <Button
              onClick={getValuesSection}
              variant="outline"
              className="bg-white h-[22px] w-[60px] ml-auto mt-auto rounded-[50px] text-[10px] border border-[#0080FF] text-[#0080FF]"
            >
              Aplicar
            </Button>
          </PopoverContent>
        </Popover>
      </TravelCard.Section>
      {isSearchPage ? (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="rounded-[50px] opacity-70 cursor-default">
                Pesquisar
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <span>Faça a busca única nos filtros à esquerda.</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        <Button onClick={handleRedirectSearchPage} className="rounded-[50px]">
          Pesquisar
        </Button>
      )}
    </div>
  );
}
