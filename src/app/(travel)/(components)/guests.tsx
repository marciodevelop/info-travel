"use client";
import { TravelCard } from "@/components/forms/travel-card";
import { Button } from "@/components/ui/button";
import { Popover } from "@/components/ui/popover";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Minus, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Guests = () => {
  const pathname = usePathname();
  const { replace, push } = useRouter();
  const searchParams = useSearchParams();

  function updateSearchParams(key: string, value: string) {
    const query = new URLSearchParams(searchParams.toString());
    query.set(key, value);
    replace(`${pathname}?${query.toString()}`, { scroll: false });
  }

  function getParamValue(param: string, defaultValue: number) {
    const value = searchParams.get(param);
    return value ? Number(value) : defaultValue;
  }

  function handleRedirectSearchPage() {
    push(`/search?${searchParams.toString()}`, { scroll: false });
  }

  const adults = getParamValue("adults", 1);
  const kids = getParamValue("kids", 0);
  const rooms = getParamValue("rooms", 1);

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
                    onClick={() => updateSearchParams("adults", String(adults + 1))}
                    className="text-xs flex justify-center items-center size-6 rounded-full bg-[#E3EBF3]"
                  >
                    <Plus size="16px" />
                  </button>
                  <span className="text-xs font-semibold w-3">{adults}</span>
                  <button
                    onClick={() =>
                      adults > 1 && updateSearchParams("adults", String(adults - 1))
                    }
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
                    onClick={() => updateSearchParams("kids", String(kids + 1))}
                    className="text-xs flex justify-center items-center size-6 rounded-full bg-[#E3EBF3]"
                  >
                    <Plus size="16px" />
                  </button>
                  <span className="text-xs font-semibold w-3">{kids}</span>
                  <button
                    onClick={() =>
                      kids > 0 && updateSearchParams("kids", String(kids - 1))
                    }
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
                    onClick={() => updateSearchParams("rooms", String(rooms + 1))}
                    className="text-xs flex justify-center items-center size-6 rounded-full bg-[#E3EBF3]"
                  >
                    <Plus size="16px" />
                  </button>
                  <span className="text-xs font-semibold w-3">{rooms}</span>
                  <button
                    onClick={() =>
                      rooms > 1 && updateSearchParams("rooms", String(rooms - 1))
                    }
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
      <Button onClick={handleRedirectSearchPage} className="rounded-[50px]">
        Pesquisar
      </Button>
    </div>
  );
};
