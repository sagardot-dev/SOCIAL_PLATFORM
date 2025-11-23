"use client";

import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { GenAvatarImage } from "@/components/global/generate-avavtar";
import { randomName } from "@/lib/helpers/randoem-name";
import { useRouter } from "next/navigation";
import { s3URL } from "@/const ";

export function ProfileHeader({
  totalPosts = 0,
  totalComments = 0,
  totalReactions = 0,
}: {
  totalPosts?: number;
  totalComments?: number;
  totalReactions?: number;
}) {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  if (!session) return <p>Please login</p>;

  return (
    <Card className="w-full bg-card/80 border border-border/60 rounded-2xl shadow-md">
      <CardHeader className="flex items-center gap-6 p-6">
        {session.user?.image ? (
          <Avatar className="h-11 w-11">
            <AvatarImage
              src={`${s3URL}/${session.user?.image}` || ""}
              alt={session.user?.name || "U"}
            />
            <AvatarFallback>
              {session.user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        ) : (
          <GenAvatarImage
            className="size-13"
            name={session.user?.name || randomName()}
          />
        )}

        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold leading-tight">
                {session.user.name}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {session.user.email}
              </p>
            </div>

            <div className="flex items-center">
              <Button
                onClick={() => router.push("/setting")}
                variant="default"
                className="px-4 py-2"
              >
                Edit Profile
              </Button>
            </div>
          </div>

          {/* === Stats Section === */}
          <div className="mt-4 flex gap-6 text-sm text-muted-foreground">
            <div className="flex flex-col justify-center items-center">
              <span className="text-lg font-semibold text-foreground">
                {totalPosts}
              </span>
              <span className="uppercase tracking-widest">Posts</span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <span className="text-lg font-semibold text-foreground">
                {totalReactions}
              </span>
              <span className="uppercase tracking-widest">Likes</span>
            </div>

            <div className="flex flex-col justify-center items-center">
              <span className="text-lg font-semibold text-foreground">
                {totalComments}
              </span>
              <span className="uppercase tracking-widest">Comments</span>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
