import { Container } from "@/components/global/container";
import { Header } from "@/components/global/header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full h-full flex-col flex">
      <Header />
      <main className=" flex-1 pt-4 md:pt-5 md:p-2 ">
        <Container className="w-full">{children}</Container>
      </main>
    </div>
  );
};

export default layout;
