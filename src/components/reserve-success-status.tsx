import reserveSuccessIcon from "@/../public/reserve-success-icon.svg";
import Image from "next/image";
import { createPortal } from "react-dom";

export function ReserveSuccessStatus() {
  return  createPortal(
    <div className="fixed inset-0 bg-[#123952] z-50 bg-opacity-95 flex flex-col justify-center overflow-y-hidden items-center gap-4 text-center">
      <Image src={reserveSuccessIcon} alt="Reserve success icon" />
      <h1 className="text-white font-semibold text-4xl sm:text-[54px]">
        Obrigado!
      </h1>
      <p className="text-white font-medium text-lg sm:text-2xl">
        Reserva realizada com sucesso.
      </p>
    </div>,
    document.body
  );
} 
