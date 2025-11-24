"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { menu } from "@/const ";

export const MobileMenu = () => {
  const pathname = usePathname();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className=" p-5 flex ">
        <SheetHeader className=" border-b">
          <SheetTitle className="text-lg">Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col flex-1 gap-3 mt-6">
          {menu.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2 rounded-lg border border-border/50",
                pathname === item.href
                  ? "bg-accent/20 font-semibold border-accent"
                  : ""
              )}
            >
              <item.icon className="size-4" />
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <SheetFooter className="mt-6">
          <p className="text-xs text-muted-foreground">
            Social Platform © {new Date().getFullYear()}
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
