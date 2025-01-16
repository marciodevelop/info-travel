"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { TravelCard } from "@/components/forms/travel-card";
import * as Select from "@radix-ui/react-select";
import { MapPin } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type DestinationProps = {
  options: TravelTypes.Sugestion[];
};

export const Destination = forwardRef((props: DestinationProps, ref: any) => {
  const { options = [] } = props;
  const [openDestination, setOpenDestination] = useState<boolean>(false);
  const [searchDestination, setSearchDestination] = useState<string>("");
  const [selectedDestination, setSelectedDestination] =
    useState<TravelTypes.Sugestion | null>(null);
  const [filteredDestination, setFilteredDestination] = useState<
    TravelTypes.Sugestion[]
  >([]);

  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  const destinationRef = useRef<HTMLInputElement>(null);

  const changeOpenDestination = () => setOpenDestination(!openDestination);

  const filterDestination = () => {
    const filtered = options.filter((destination) =>
      destination.name.toLowerCase().includes(searchDestination.toLowerCase())
    );
    setFilteredDestination(filtered);
  };

  const handleSetDestination = (destination: TravelTypes.Sugestion | null) => {
    const params = new URLSearchParams(searchParams);
    if (destination) {
      params.set("destination", destination.id);
    } else {
      params.delete("destination");
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
    setSelectedDestination(destination);
  };

  const handleSearchDestination = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;
    setSearchDestination(value);

    if (value.length > 1) {
      setOpenDestination(true);
    } else {
      setOpenDestination(false);
    }

    if (event.type === "change") {
      handleSetDestination(null);
    }
  };

  useImperativeHandle(ref, () => {
    return {
      getSelectedDestination: (): TravelTypes.Sugestion | null =>
        selectedDestination,
    };
  });

  useEffect(() => {
    filterDestination();
  }, [searchDestination]);

  useEffect(() => {
    if (destinationRef.current && openDestination) {
      destinationRef.current.focus();
    }
  }, [openDestination]);

  return (
    <TravelCard.Section icon="MapPin" title="Destino">
      <Select.Root
        open={openDestination}
        onOpenChange={changeOpenDestination}
        value={selectedDestination?.id.toString() || ""}
        onValueChange={(value) => {
          const selected = options.find((opt) => opt.id.toString() === value);
          handleSetDestination(selected || null);
          setOpenDestination(false);
        }}
      >
        <Select.Trigger asChild>
          <input
            ref={destinationRef}
            onChange={handleSearchDestination}
            type="text"
            className="w-full text-xs outline-0 h-4"
            placeholder="Selecione seu destino"
            value={
              selectedDestination ? selectedDestination.name : searchDestination
            }
          />
        </Select.Trigger>
        <Select.Content className="w-[313px] bg-white border border-gray-100 rounded-md mt-6 h-[241px] overflow-y-scroll scrollbar-custom">
          <div className="absolute size-0 border-[7px] ml-2 mt-[-14px] border-b-white border-l-transparent border-r-transparent border-t-transparent" />
          {selectedDestination ? (
            <Select.Item
              className="flex justify-start gap-4 outline-none items-center hover:bg-[#E3EBF3] w-full px-[13px] py-[10px]"
              value={selectedDestination.id.toString()}
            >
              <MapPin color="#0080ff" className="size-[13px]" />
              <div className="flex flex-col">
                <span className="text-xs font-semibold">
                  {selectedDestination.name}
                </span>
                <span className="text-[10px] text-[#698096]">
                  {selectedDestination.region}
                </span>
              </div>
            </Select.Item>
          ) : (
            <>
              {filteredDestination.length > 0 ? (
                filteredDestination.map((destination) => (
                  <Select.Item
                    key={destination.id}
                    className="flex justify-start gap-4 outline-none items-center hover:bg-[#E3EBF3] w-full px-[13px] py-[10px]"
                    value={destination.id.toString()}
                  >
                    <MapPin color="#0080ff" className="size-[13px]" />
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold">
                        {destination.name}
                      </span>
                      <span className="text-[10px] text-[#698096]">
                        {destination.region}
                      </span>
                    </div>
                  </Select.Item>
                ))
              ) : (
                <div className="flex justify-center items-center h-full">
                  <span className="text-sm text-[#698096]">
                    Nenhum destino encontrado
                  </span>
                </div>
              )}
            </>
          )}
        </Select.Content>
      </Select.Root>
    </TravelCard.Section>
  );
});
