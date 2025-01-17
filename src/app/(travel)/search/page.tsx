import { TravelBookingForm } from "../(components)/travel-booking-form";
import HotelCard from "./(components)/hotel-card";

type searchParams = {
  searchParams: {
    destination: string;
    entryDate: string;
    exitDate: string;
    adults: string;
    kids: string;
    rooms: string;
  };
};

export default async function Search(params: searchParams) {
  const { searchParams } = params;
  const { destination, entryDate, exitDate, rooms } = await searchParams;

  const destinations = await fetch("http://0.0.0.0:3333/suggestions");
  const destinationsData = await destinations.json();

  const destinationsFiltered = destination
    ? destinationsData.find(
        (item: TravelTypes.Sugestion) => String(item.id) === destination
      )
    : null;

    const response = await fetch("http://0.0.0.0:3333/hotels");
    const data: TravelTypes.HotelData[] = await response.json();

  const hotels = await data.filter(({ hotel, id, rooms: roomData }) => {
    const entryDateObj = entryDate ? new Date(entryDate) : new Date();
    const exitDateObj = exitDate ? new Date(exitDate) : new Date();

    const isDateValid = exitDateObj.getTime() > entryDateObj.getTime();
    const isRoomsValid = roomData.length >= (rooms ? Number.parseInt(rooms) : 1);

    return isDateValid && isRoomsValid;
  });

  return (
    <main className="flex flex-col px-[74px] pb-8">
      <div className="mt-[26px] mb-[28px] z-40">
        <TravelBookingForm />
      </div>
      <h3 className="flex font-bold text-[#00264D] text-[20px]">
        {destinationsFiltered?.name ?? "Todos os destinos"}
        <span className="font-normal">, {destinationsFiltered?.region ?? "aguma"}</span>
      </h3>
      <h4 className="text-xs text-[#698096] mb-[21px]">
        {hotels.length} hoteis encontrados
      </h4>
      <section className="w-full ">
        {hotels.length > 0 ? (
          <div className="grid grid-cols-3 gap-[53px]">
            {hotels.map((item) => (
              <HotelCard key={item.id} data={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-[26px]">
            <h2 className="text-2xl font-bold">Nenhum hotel encontrado</h2>
            <p className="text-lg">
              Não encontramos nenhum hotel para a sua busca.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
