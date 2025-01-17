import { MapPin } from "lucide-react";
import Image from "next/image";

import StartSVG from "@/../public/star.svg";
import { TravelBookingForm } from "../../(components)/travel-booking-form";
import DetailRoomCard from "./(components)/detail-room-card";

type searchParamsHotelDetails = {
  params: { id: string };
};

export default async function HotelDetails({
  params,
}: searchParamsHotelDetails) {
  const { id } = await params;

  const response = await fetch(`http://0.0.0.0:3333/hotels/${id}`);

  const data: TravelTypes.HotelData = await response.json();

  return (
    <main className="flex flex-col gap-[20px]">
      <div className="mx-auto mt-[26px] z-40">
        <TravelBookingForm />
      </div>
      <section className="relative w-[1292px] mx-auto mb-[26px] grid grid-cols-3 gap-4 p-4 rounded-[14px] bg-white drop-shadow-md">
        <Image
          height={312}
          width={447}
          src={data.hotel.image}
          alt={data.hotel.name}
          className="col-span-1 object-cover rounded-[14px]"
        />
        <div className="col-span-2 flex flex-col">
          <div className="flex flex-col gap-1">
            <h2 className="text-[20px] font-semibold text-[#00264D]">
              {data.hotel.name}
            </h2>
            <span className="flex gap-2">
              <MapPin size={13} />
              <span className="text-xs text-[#698096]">
                {data.hotel.address}
              </span>
            </span>
          </div>
          <div className="flex mb-[13px]">
            {Array.from({ length: data.hotel.stars }).map((star, index) => (
              <Image
                key={index}
                src={StartSVG}
                alt="Star Icon"
                width={16}
                height={16}
                className="mt-[7px]"
              />
            ))}
          </div>
          <p className="text-xs text-[#698096]">{data.hotel.description}</p>
        </div>
        {data.rooms.length > 0 ? (
          data.rooms.map((room, idx) => (
            <DetailRoomCard
              name={room.roomType.name}
              key={idx}
              refundable={room.cancellationPolicies.refundable}
              price={room.price.amount}
            />
          ))
        ) : (
          <span>Nenhum quarto encontrado</span>
        )}
      </section>
    </main>
  );
}
