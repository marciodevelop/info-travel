import { TravelBookingForm } from "../(components)/travel-booking-form";

type searchParams = {
  searchParams: {
    destination: string;
    entryDate: string;
    exitDate: string;
    adults: string;
    kids: string;
    rooms: string;
  };
}

export default function Search(params: searchParams) {
  const { searchParams } = params;

  // console.log(searchParams);
  // const response = await fetch("http://0.0.0.0:3333/suggestions");
  // const data = await response.json();

  return (
    <main className="flex flex-col py-[26px] px-[74px]">
      <div>
        <TravelBookingForm />
      </div>
      <section className="w-full"></section>
    </main>
  );
}
