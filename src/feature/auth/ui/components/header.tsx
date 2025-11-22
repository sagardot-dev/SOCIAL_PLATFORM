import React from "react";

interface HeaderProps {
  header : string;
  label: string;
}

export const Header = ({ header ,label }: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-2 items-start justify-start ">
     <h1 className="text-xl font-semibold">
       {header}
     </h1>
     <p className="text-muted-foreground text-sm tracking-tight">
    {label}
     </p>
    </div>
  );
};