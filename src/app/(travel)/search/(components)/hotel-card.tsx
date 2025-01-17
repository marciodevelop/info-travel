"use client";

import Image from "next/image";
import StartSVG from "@/../public/star.svg";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type hotelCardProps = {
  data: TravelTypes.HotelData;
};

export default function HotelCard({ data }: hotelCardProps) {
  const { hotel, lowestPrice, id } = data;

  const pathname = usePathname();
  const searchParams = useSearchParams()
  const { push } = useRouter()

  function handleNavigateToHotelDetails() {
    push(`${pathname}/${id}?${searchParams.toString()}`, { 
      scroll: false,
    });
  }

  return (
    <div className="relative flex w-[397px] h-[357px] rounded-[14px] bg-white px-3 py-[23px] drop-shadow-md">
      <div className="absolute -z-10 top-0 left-0 w-full h-[265px] bottom-[92px] rounded-[14px] overflow-hidden">
        <Image
          src={hotel.image}
          alt={hotel.name}
          width={397}
          height={265}
          quality={100}
          className="object-cover"
        />
        <div className="absolute flex items-end bottom-[14px] left-3">
          <span className="text-[27px] text-white font-semibold leading-none">
            {lowestPrice.amount.toLocaleString("pt-BR", {
              style: "currency",
              currency: lowestPrice.currency,
            })}
          </span>
          <span className="text-xs ml-1 leading-none text-zinc-800">
            {" "}
            / por noite
          </span>
        </div>
      </div>

      <div className="mt-auto flex flex-col">
        <span className="max-w-[244px] truncate text-[18px] text-[#00264D] font-semibold">
          {hotel.name}
        </span>
        <span className="flex gap-[6px]">
          {Array.from({ length: hotel.stars }).map((_, index) => (
            <Image
              key={index}
              src={StartSVG}
              alt="Star Icon"
              width={16}
              height={16}
              className="mt-1"
            />
          ))}
        </span>
      </div>
      <Button
        onClick={handleNavigateToHotelDetails}
        className="h-[28px] w-[117px] mt-auto ml-auto rounded-[50px] text-xs drop-shadow-md"
      >
        ver mais
      </Button>
    </div>
  );
}
