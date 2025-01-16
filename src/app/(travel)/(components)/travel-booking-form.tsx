import { TravelCard } from "@/components/forms/travel-card";
import { Destination } from "./destination";
import { EntryDate } from "./entry-date";
import { ExitDate } from "./exit-date";
import { Guests } from "./guests";

export async function TravelBookingForm() {
  const response = await fetch("http://0.0.0.0:3333/suggestions");
  const suggestions = await response.json();

  return (
    <TravelCard.Root>
      <Destination options={suggestions} />
      <EntryDate />
      <ExitDate />
      <Guests />
    </TravelCard.Root>
  );
}
