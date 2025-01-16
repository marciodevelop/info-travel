import { ComponentProps } from "react";
import * as Icon from "lucide-react";
import { cn } from "@/lib/utils";

type TravelCardSectionProps = {
  children: React.ReactNode;
  title: string;
  icon: 'MapPin' | 'Calendar' | 'Users';
} & ComponentProps<'div'>;

export function TravelCardSection({ children, icon, title, className }: TravelCardSectionProps) {

  const IconComponent = Icon[icon];

  return (
    <div className={cn('w-full h-[47px] flex flex-col justify-start pl-3', className)} >
      <div className="flex justify-start gap-2 ">
        <IconComponent className="size-[14px]" color="#0080ff" />
        <span className="text-[#698096] text-xs">{title}</span>
      </div>
      <div className="h-5 w-full">{children}</div>
    </div>
  )
}