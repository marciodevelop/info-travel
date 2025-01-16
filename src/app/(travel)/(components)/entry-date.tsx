"use client";
import { ptBR } from "date-fns/locale/pt-BR";
import { TravelCard } from "@/components/forms/travel-card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export const EntryDate = forwardRef((_, ref: any) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();


  useImperativeHandle(ref, () => {
    return {
      getDate: () => date,
    };
  });

  useEffect(() => {
    if (date) {
      const params = new URLSearchParams(searchParams);
      params.set("entryDate", date.toISOString());
      replace(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }
  }, [date]);

  return (
    <TravelCard.Section className="border-l border-l-[#E3EBF3]" icon="Calendar" title="Data de Entrada">
      <Popover>
        <PopoverTrigger asChild>
          <button className="text-xs">
            {date?.toLocaleString("pt-BR", {
              dateStyle: "short",
            })}
          </button>
        </PopoverTrigger>
        <PopoverContent align="start" className="mt-6 border-0 rounded-xl">
          <div className="absolute size-0 border-[7px] ml-2 mt-[-30px] border-b-white border-l-transparent border-r-transparent border-t-transparent" />
          <Calendar mode="single" locale={ptBR} defaultMonth={date} selected={date} onSelect={setDate} />
        </PopoverContent>
      </Popover>
    </TravelCard.Section>
  );
})
