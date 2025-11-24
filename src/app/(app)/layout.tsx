import { Container } from "@/components/global/container";
import { Header } from "@/components/global/header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" w-full h-screen flex-col flex">
      <Header />
      <main className=" flex-1 pt-2 md:pt-2 md:p-2  ">
        <Container className="w-full h-full">{children}</Container>
      </main>
    </div>
  );
};

export default layout;
