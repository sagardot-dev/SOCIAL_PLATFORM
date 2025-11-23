"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export const GenAvatarImage = ({
  name,
  className,
}: {
  name: string;
  className?: string;
}) => {
  return (
    <Avatar
      className={cn(
        "cursor-pointer bg-accent-foreground/10 size-10 p-1",
        className
      )}
    >
      <AvatarImage
        src={`https://api.dicebear.com/9.x/bottts/svg?seed=${encodeURIComponent(
          name
        )}`}
      />
      <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};
