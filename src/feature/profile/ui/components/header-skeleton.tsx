"use client";

import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ProfileHeaderSkeleton() {
  return (
    <Card className="w-full bg-card/80 border border-border/60 rounded-2xl shadow-md">
      <CardHeader className="flex items-center gap-6 p-6">

        {/* Avatar */}
        <Skeleton className="h-11 w-11 rounded-full" />

        <div className="flex-1 space-y-4">

          {/* Name + email */}
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-52" />
            </div>

            <Skeleton className="h-9 w-28 rounded-md" />
          </div>

          {/* Stats */}
          <div className="mt-4 flex gap-6 text-sm">
            <Skeleton className="h-12 w-16 rounded-md" />
            <Skeleton className="h-12 w-16 rounded-md" />
            <Skeleton className="h-12 w-16 rounded-md" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
