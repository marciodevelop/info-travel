"use client";
import { ReserveSuccessStatus } from "@/components/reserve-success-status";
import { Button } from "@/components/ui/button";
import * as Icon from "lucide-react";
import { useEffect, useState } from "react";

type detailRoomCardProps = {
  refundable: boolean;
  price: number;
  name: string;
};

export default function DetailRoomCard(props: detailRoomCardProps) {
  const { refundable, price, name } = props;
  
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  function handleConfirmReservation() {
    setShowConfirmation(true);
  }

  useEffect(() => {
    if (showConfirmation) {
      setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    }
  }, [showConfirmation]);

  
  return (
    <div className="col-span-3 flex relative justify-between items-center gap-[42px] bg-[#E3EBF3] rounded-[14px] px-[22px] py-4">
      {showConfirmation && <ReserveSuccessStatus />}
      <div className="flex flex-col gap-2">
        <span className="text-[16px] font-semibold text-[#00264D]">{name}</span>
        <span className="flex items-center gap-2 text-xs font-semibold">
          {refundable ? (
            <Icon.CheckCircle size={12} color="#0080FF" />
          ) : (
            <Icon.XCircle size={12} color="#FF0000" />
          )}
          {refundable ? (
            <span className="text-[#0080FF]">Cancelamento gratuito</span>
          ) : (
            <span className="text-[#FF0000]">Multa de cancelamento</span>
          )}
        </span>
      </div>
      <div className="flex flex-col gap-1 ml-auto">
        <span className="text-[27px] font-semibold text-[#0080FF]">
          {price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
          <span className="text-[10px]"> /por noite</span>
        </span>
        <span className="text-xs text-[#698096]">Pagamento no hotel</span>
      </div>
      <Button onClick={handleConfirmReservation} className="rounded-[50px] text-xs">
        Reserve agora
      </Button>
    </div>
  );
}
