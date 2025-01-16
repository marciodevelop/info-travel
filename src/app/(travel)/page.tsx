import { TravelBookingForm } from "./(components)/travel-booking-form";

export default async function Home() {
  
  return (
    <main className="flex flex-col gap-[63px] justify-center items-center min-h-[calc(100vh-126px)]">
      <h2 className="text-[50px] text-black font-semibold leading-[50px] text-center max-w-[765px]">
        Os melhores <span className="text-[#0080ff]">Hoteis</span> e{" "}
        <span className="text-[#0080ff]">Destinos</span> para sua viagem
      </h2>
      <TravelBookingForm />
    </main>
  );
}
