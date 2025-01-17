import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Suspense } from "react";
import Loading from "./loading";

export default function TravelLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 relative">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
      <Footer />
    </div>
  );
}
