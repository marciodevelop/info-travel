import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="mx-[74px] gap-2 flex flex-col">
      <Skeleton className="mt-[26px] w-[1292px] h-[66px] bg-zinc-300 rounded-lg" />
      
      <Skeleton className="mt-[28px] w-[165px] h-[26px] bg-zinc-300 rounded-lg" />

      <Skeleton className="mb-[21px] w-[165px] h-[15px] bg-zinc-300 rounded-lg" />

      <div className="grid grid-cols-3 gap-[53px]">
        {[...Array(6)].map((_, index) => (
          <Skeleton
            key={index}
            className="w-[397px] h-[357px] bg-zinc-300 rounded-[14px]"
          />
        ))}
      </div>
    </div>
  );
}
