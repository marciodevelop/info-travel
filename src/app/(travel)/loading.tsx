import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-[800px]">
      <Skeleton className="w-[600px] h-[40px]" />
      <Skeleton className="w-[400px] h-[30px]" />
      <Skeleton className="w-full h-[70px]" />
    </div>
  );
}
