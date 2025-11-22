import { cn } from "@/lib/utils";
import React from "react";

export const Heading = ({
  children,
  className,
  as = "h2",
}: {
  children: React.ReactNode;
  className: string;
  as?: "h1" | "h2";
}) => {
  const Tag = as;
  return (
    <Tag
      className={cn(
        " text-xl md:text-4xl lg:text-6xl tracking-tight",
        className
      )}
    >
      {children}
    </Tag>
  );
};


export const SubHeading = ({
  children,
  className,
  as = "p",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | 'p';
}) => {
  const Tag = as;
  return (
    <Tag
      className={cn(
        " text-base md:text-lg text-neutral-500 dark:text-neutral-400 max-w-2xl",
        className
      )}
    >
      {children}
    </Tag>
  );
};