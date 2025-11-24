"use client";
import { Container } from "@/components/global/container";
import { Button } from "@/components/ui/button";
import { menu } from "@/const ";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { ModeToggle } from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { authClient } from "@/lib/auth-client";
import { MobileMenu } from "./menu-sheet-mobile";

export const Header = () => {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  return (
    <>
      <Container className=" gap-x-6  w-full border-b border-border/60 max-w-6xl px-5! md:p-5 h-15 justify-between items-center flex ">
        <Logo />
        {!isMobile && (
          <div className="flex gap-x-8">
            {menu.map((item) => (
              <Link
                href={item.href}
                className={cn(
                  " w-full flex gap-x-2 py-2 px-6 justify-center items-center border border-border/50 rounded-lg",
                  item.href === pathname
                    ? "bg-linear-0 from-chart-1/10 via-accent to-chart-1/20 border-0 font-bold"
                    : ""
                )}
                key={item.name}
              >
                <p className=" text-sm">{item.name}</p>
                <item.icon className=" size-4" />
              </Link>
            ))}
          </div>
        )}
        <div className=" flex justify-center items-center gap-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={"secondary"}>
                <User className=" size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-39" align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                  <Link href={"/profile"}>Profile</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => authClient.signOut()}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
          <MobileMenu />
        </div>
      </Container>
    </>
  );
};

export const Logo = () => {
  return (
    <>
      <Link className=" flex justify-center items-center gap-x-4" href={"/"}>
        <Image src={"/logo.svg"} width={30} height={30} alt="logo" />
        <p className=" hidden md:block">Social platform</p>
      </Link>
    </>
  );
};
