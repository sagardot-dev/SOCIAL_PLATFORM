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
  header?: string;
  children: React.ReactNode;
  headerlabel?: string;
  backButtonlable?: string;
  backButtonherf?: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  header = "Social app",
  headerlabel,
  backButtonlable,
  backButtonherf,
}: CardWarpperProps) => {
  return (
    <Card className=" md:min-w-110 min-w-xs max-w-[340px] md:max-w-lg px-3 flex flex-col py-8 mx-auto">
      <CardHeader>
        <Header header={header} label={headerlabel || ""} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {backButtonlable && (
        <CardFooter>
          <BackButton
            herf={backButtonherf || ""}
            label={backButtonlable || ""}
          />
        </CardFooter>
      )}
    </Card>
  );
};
