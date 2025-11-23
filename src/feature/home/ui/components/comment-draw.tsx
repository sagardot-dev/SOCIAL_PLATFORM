"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { useGetComments } from "../../server/use-get-comments";
import { GenAvatarImage } from "@/components/global/generate-avavtar";
import { randomName } from "@/lib/helpers/randoem-name";
import { MoreVertical, PencilIcon, Trash2 } from "lucide-react";

export const CommentBox = ({
  open,
  setOpen,
  postId,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  postId: string;
}) => {
  const { data: comments, isLoading } = useGetComments(postId);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent className="p-2 md:px-10 flex gap-y-2 mx-auto">
        <DrawerHeader className="border-b">
          <DrawerTitle>Comments</DrawerTitle>
          <DrawerDescription>Read and write comments</DrawerDescription>
        </DrawerHeader>

        <Card className="w-full border-none shadow-none bg-background flex justify-center items-center max-w-4xl mx-auto">
          <CardContent className="max-h-[50vh] overflow-y-auto px-1 space-y-4 w-full mx-auto flex justify-center items-center flex-col ">
            {isLoading && (
              <p className="text-sm text-muted-foreground">Loading...</p>
            )}

            {!isLoading && comments?.length === 0 && (
              <p className="text-sm text-muted-foreground">No comments yet.</p>
            )}

            {comments?.map((c) => (
              <Card
                key={c.id}
                className="p-3 border border-border/70 rounded-lg shadow-sm bg-card/40 backdrop-blur-sm w-full max-w-2xl "
              >
                <div className=" flex justify-between items-center ">
                  <div className="flex gap-3 items-start">
                    {c.user?.image ? (
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={c.user.image || ""}
                          alt={c.user?.name || "U"}
                        />
                        <AvatarFallback>
                          {c.user?.name?.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    ) : (
                      <GenAvatarImage name={c.user.name || randomName()} />
                    )}

                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">
                        {c.user?.name}
                        <span className="text-xs text-muted-foreground ml-2">
                          {new Date(c.createdAt).toLocaleTimeString(undefined, {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            hour12: false,
                          })}
                        </span>
                      </span>

                      <span className="text-sm mt-1">{c.content}</span>
                    </div>
                  </div>
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size={"icon-sm"} variant="outline">
                          <MoreVertical />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="w-30 flex flex-col gap-y-0! p-1!"
                        align="end"
                      >
                        <DropdownMenuLabel asChild className=" flex gap-x-2">
                          <Button
                            className=" w-full"
                            size={"icon-sm"}
                            variant="ghost"
                          >
                            <PencilIcon className=" size-4" />
                            Edit
                          </Button>
                        </DropdownMenuLabel>
                        <DropdownMenuLabel asChild>
                          <Button
                            size={"icon-sm"}
                            className=" w-full"
                            variant="ghost"
                          >
                            <Trash2 className=" size-4" />
                            Delete
                          </Button>
                        </DropdownMenuLabel>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </Card>
            ))}
          </CardContent>
        </Card>

        <DrawerFooter className="border-t flex justify-center items-center">
          <div className=" flex gap-x-2">
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
