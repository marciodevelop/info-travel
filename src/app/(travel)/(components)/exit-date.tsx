"use client";
import { ptBR } from "date-fns/locale/pt-BR";
import { TravelCard } from "@/components/forms/travel-card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { forwardRef, useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { addDays, isBefore, isSameDay } from "date-fns";

export const ExitDate = forwardRef((_, ref: any) => {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const currentParams = new URLSearchParams(searchParams);

  const defaultDate = addDays(new Date(), 1);

  const currentDate = currentParams.get("exitDate")
    ? new Date(currentParams.get("exitDate") as string)
    : defaultDate;

  const handleDateChange = (newDate: Date | undefined) => {
    if (!newDate) return;
    currentParams.set("exitDate", newDate.toISOString());
    replace(`${pathname}?${currentParams.toString()}`, {
      scroll: false,
    });
  };

  const isDisabledDate = (date: Date) => {
    return isBefore(date, new Date()) || isSameDay(date, new Date());
  };

  useEffect(() => {
    if (!currentParams.get("exitDate")) {
      currentParams.set("exitDate", defaultDate.toISOString());
      replace(`${pathname}?${currentParams.toString()}`, {
        scroll: false,
      });
    }
  }, [currentParams, defaultDate, pathname, replace]);

  return (
    <TravelCard.Section
      className="border-l border-l-[#E3EBF3]"
      icon="Calendar"
      title="Data de Saída"
    >
      <Popover>
        <PopoverTrigger asChild>
          <button className="text-xs">
            {currentDate?.toLocaleString("pt-BR", {
              dateStyle: "short",
            })}
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="mt-6 border-0 rounded-xl"
        >
          <div className="absolute size-0 border-[7px] ml-2 mt-[-30px] border-b-white border-l-transparent border-r-transparent border-t-transparent" />
          <Calendar
            mode="single"
            locale={ptBR}
            disabled={isDisabledDate}
            defaultMonth={currentDate}
            selected={currentDate}
            onSelect={handleDateChange}
          />
        </PopoverContent>
      </Popover>
    </TravelCard.Section>
  );
});
