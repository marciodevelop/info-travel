type TravelCardRootProps = {
  children: React.ReactNode;
};

export function TravelCardRoot({ children }: TravelCardRootProps) {
  return (
    <div className="flex bg-white w-[1307px] h-[66px] rounded-[11px] drop-shadow-md px-4 py-2">{children}</div>
  )
}