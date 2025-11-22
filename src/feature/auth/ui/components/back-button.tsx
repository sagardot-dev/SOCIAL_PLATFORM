"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface BackButtonProps {
  herf: string;
  label: string;
}

export const BackButton = ({ herf, label }: BackButtonProps) => {
  return (
    <Button className="font-normal w-full" size={"sm"} variant={"link"} asChild>
      <Link href={herf}>{label}</Link>
    </Button>
  );
};