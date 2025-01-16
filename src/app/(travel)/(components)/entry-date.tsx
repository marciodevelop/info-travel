"use client";
import { ptBR } from "date-fns/locale/pt-BR";
import { TravelCard } from "@/components/forms/travel-card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { forwardRef } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export const EntryDate = forwardRef((_, ref: any) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(searchParams);
  const currentDate = currentParams.get("entryDate")
    ? new Date(currentParams.get("entryDate") as string)
    : new Date();

  const handleDateChange = (newDate: Date | undefined) => {
    if (!newDate) return;
    currentParams.set("entryDate", newDate.toISOString());
    replace(`${pathname}?${currentParams.toString()}`, {
      scroll: false,
    });
  };

  return (
    <TravelCard.Section
      className="border-l border-l-[#E3EBF3]"
      icon="Calendar"
      title="Data de Entrada"
    >
      <Popover>
        <PopoverTrigger asChild>
          <button className="text-xs">
            {currentDate?.toLocaleString("pt-BR", {
              dateStyle: "short",
            })}
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="mt-6 border-0 rounded-xl">
          <div className="absolute size-0 border-[7px] ml-2 mt-[-30px] border-b-white border-l-transparent border-r-transparent border-t-transparent" />
          <Calendar
            mode="single"
            locale={ptBR}
            defaultMonth={currentDate}
            selected={currentDate}
            onSelect={handleDateChange}
          />
        </PopoverContent>
      </Popover>
    </TravelCard.Section>
  );
});
