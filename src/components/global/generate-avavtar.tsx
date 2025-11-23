'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const GenAvatarImage = ({ name }: { name: string }) => {
  return (
    <Avatar className="cursor-pointer bg-accent-foreground/10 size-10 p-1">
      <AvatarImage
        src={`https://api.dicebear.com/9.x/bottts/svg?seed=${encodeURIComponent(name)}`}
      />
      <AvatarFallback>{name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
};