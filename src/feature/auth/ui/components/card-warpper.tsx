"user client";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "./header";
import { BackButton } from "./back-button";

interface CardWarpperProps {
  children: React.ReactNode;
  headerlabel: string;
  backButtonlable?: string;
  backButtonherf?: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerlabel,
  backButtonlable,
  backButtonherf,
}: CardWarpperProps) => {
  return (
    <Card className=" md:min-w-110 min-w-95 max-w-lg px-3  flex flex-col py-9 mx-auto ">
      <CardHeader>
        <Header header="Social app" label={headerlabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <BackButton herf={backButtonherf || ""} label={backButtonlable || ""} />
      </CardFooter>
    </Card>
  );
};
