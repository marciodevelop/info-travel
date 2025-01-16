
import { TravelCard } from "@/components/forms/travel-card";
import { Destination } from "@/app/(travel)/(components)/destination";
import { EntryDate } from "./(components)/entry-date";
import { ExitDate } from "./(components)/exit-date";
import { Guests } from "./(components)/guests";

export default async function Home() {
  
  const response = await fetch("http://0.0.0.0:3333/suggestions");
  const data = await response.json();

  return (
    <main className="flex flex-col gap-[63px] justify-center items-center min-h-[calc(100vh-126px)]">
        <h2 className="text-[50px] text-black font-semibold leading-[50px] text-center max-w-[765px]">
          Os melhores <span className="text-[#0080ff]">Hoteis</span> e <span className="text-[#0080ff]">Destinos</span> para sua viagem
        </h2>
        <TravelCard.Root>
          <Destination options={data} />
          <EntryDate />
          <ExitDate />
          <Guests />
        </TravelCard.Root>
    </main>
  )
}