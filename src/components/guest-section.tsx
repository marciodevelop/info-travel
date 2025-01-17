import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Minus, Plus } from "lucide-react";

type guestSectionProps = {
  title: string;
  lowerValue?: number;
  defaltValue?: number;
};

export const GuestSection = forwardRef((props: guestSectionProps, ref: any) => {
  const { title, lowerValue = 0, defaltValue } = props;

  const [amount, setAmount] = useState<number>(lowerValue);

  function handleIncrementAmount() {
    setAmount(amount + 1);
  }

  function handleDecrementAmount() {
    if (amount >= lowerValue) {
      setAmount(amount - 1);
    }
  }

  useImperativeHandle(ref, () => ({
    amount,
  }));

  useEffect(() => {
    if (defaltValue) {
      setAmount(defaltValue);
    }
  }, [defaltValue]);

  return (
    <div className="flex w-full justify-between items-center py-3 border-b border-b-[#E3EBF3]">
      <span className="text-xs">{title}</span>
      <div className="flex gap-2 items-center">
        <button
          onClick={handleDecrementAmount}
          className="text-xs flex justify-center items-center size-6 rounded-full bg-[#E3EBF3]"
        >
          <Minus size="16px" />
        </button>
        <span className="text-xs font-semibold w-3">{amount}</span>
        <button
          onClick={handleIncrementAmount}
          className="text-xs flex justify-center items-center size-6 rounded-full bg-[#E3EBF3]"
        >
          <Plus size="16px" />
        </button>
      </div>
    </div>
  );
});
