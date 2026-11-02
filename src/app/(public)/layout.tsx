
import type { ReactNode } from "react";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({
  children,
}: Readonly<PublicLayoutProps>) {
  return (
    <>
      <Header />

      <main
        id="main-content"
        className="
          relative
          flex min-h-[60vh] flex-1
          flex-col
          bg-white
        "
      >
        {children}
      </main>

      <Footer />
    </>
  );
}
