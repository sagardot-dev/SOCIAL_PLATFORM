"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Heart, Share2 } from "lucide-react";
import { GenAvatarImage } from "@/components/global/generate-avavtar";
import { randomName } from "@/lib/helpers/randoem-name";
import { authClient } from "@/lib/auth-client";
import { CommentBox } from "@/feature/home/ui/components/comment-draw";

export function PostCard({
  id,
  content,
  createdAt,
  commentsCount = 0,
  reactionsCount = 0,
}: {
  id: string;
  content: string;
  image?: string | null;
  createdAt: Date | string;
  commentsCount: number;
  reactionsCount: number;
}) {
  const { data: session } = authClient.useSession();

  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  if (!session) return <p>Please login</p>;
  return (
    <Card className="w-full max-w-lg rounded-xl shadow-sm border border-border">
      {/* Header */}
      <CardHeader className="flex flex-row gap-3 items-center">
        {session.user?.image ? (
          <Avatar className="h-11 w-11">
            <AvatarImage
              src={session.user?.image || ""}
              alt={session.user?.name || "U"}
            />
            <AvatarFallback>
              {session.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        ) : (
          <GenAvatarImage name={session.user?.name || randomName()} />
        )}

        <div className="flex flex-col">
          <span className="font-semibold text-card-foreground text-[15px]">
            {session.user?.name}
          </span>
          <span className="text-muted-foreground text-[13px]">
            {new Date(createdAt).toLocaleTimeString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 w-full ">
        <p className="text-[15px] leading-[1.45] whitespace-pre-line">
          {content}
        </p>
        <Separator className="my-2" />

        <div className="flex items-center justify-between text-muted-foreground w-full">
          <div className="flex items-center md:gap-2 shrink md:mr-2">
            <Button
              onClick={() => setActive((v) => !v)}
              variant={active ? "default" : "ghost"}
              size="sm"
              className="gap-2 hover:bg-accent/50 rounded-lg flex justify-center items-center px-2!"
            >
              <Heart className="size-3" /> {reactionsCount}
            </Button>

            <Button
              onClick={() => setOpen(true)}
              variant="ghost"
              size="icon"
              className="gap-2 hover:bg-accent/50 rounded-lg"
            >
              <MessageCircle className="size-3" /> {commentsCount}
            </Button>
            <CommentBox open={open} setOpen={setOpen} postId={id} />
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 hover:bg-accent/50 rounded-lg shrink hidden md:flex"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
