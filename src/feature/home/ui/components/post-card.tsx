"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Heart, Share2 } from "lucide-react";
import { PostType } from "@/types";
import { GenAvatarImage } from "@/components/global/generate-avavtar";
import { CommentForm } from "./comment-form";
import { CommentBox } from "./comment-draw";
import { randomName } from "@/lib/helpers/random-name";
import { useToggleReaction } from "../../server/use-like";
import { s3URL } from "@/const ";

export function PostCard({ post }: { post: PostType }) {
  const useLikeMutate = useToggleReaction();
  const [open, setOpen] = useState(false);

  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked || false);

  const user = post.user;

  const handleLike = () => {
    setIsLiked((val) => !val);
    useLikeMutate.mutate(post.id);
  };

  return (
    <Card className="w-full max-w-2xl rounded-xl shadow-sm border border-border">
      <CardHeader className="flex flex-row gap-3 items-center">
        {post.user?.image ? (
          <Avatar className="h-11 w-11">
            <AvatarImage
              src={`${s3URL}/${user?.image}` || ""}
              alt={user?.name || "U"}
            />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        ) : (
          <GenAvatarImage name={user?.name || randomName()} />
        )}

        <div className="flex flex-col">
          <span className="font-semibold text-card-foreground text-[15px]">
            {user?.name}
          </span>
          <span className="text-muted-foreground text-[13px]">
            {new Date(post.createdAt).toLocaleTimeString(undefined, {
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
          {post.content}
        </p>

        {post.image && (
          <div className="relative w-full flex justify-center items-center overflow-hidden rounded-lg border border-border">
            <Image
              src={`${s3URL}/${post.image}`}
              alt="post visual"
              width={450}
              height={450}
              className="rounded-lg h-auto w-full  animate-fadeIn"
            />
          </div>
        )}

        <Separator className="my-2" />

        <div className="flex items-center justify-between text-muted-foreground w-full">
          <div className="flex items-center md:gap-2 shrink md:mr-2">
            <Button
              variant={"outline"}
              disabled={useLikeMutate.isPending}
              onClick={handleLike}
              size="sm"
              className="gap-2 hover:bg-accent/50 rounded-lg flex justify-center items-center px-2!"
            >
              <Heart
                fill={isLiked ? "currentColor" : "none"}
                className=" size-3"
              />{" "}
              {post.reactions?.length || 0}
            </Button>
            <Button
              onClick={() => setOpen(true)}
              variant="ghost"
              size="icon"
              className="gap-2 hover:bg-accent/50 rounded-lg"
            >
              <MessageCircle className=" size-3" /> {post.comments?.length || 0}
            </Button>
            <CommentBox open={open} setOpen={setOpen} postId={post.id} />
          </div>

          <CommentForm postId={post.id} />

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
