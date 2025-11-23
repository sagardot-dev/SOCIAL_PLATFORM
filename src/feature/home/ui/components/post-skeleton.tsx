import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const PostCardSkeleton = () => {
  return (
    <Card className="w-full max-w-2xl rounded-xl shadow-sm border border-border">
      <CardHeader className="flex flex-row gap-3 items-center">
        <Skeleton className="h-11 w-11 rounded-full" />

        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-20" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4 w-full">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-3/4" />

        <Skeleton className="w-full h-[260px] rounded-lg" />

        <div className="border-t my-2" />

        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-14 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>

          <div className="flex-1" />

          <Skeleton className="h-8 w-24 rounded-md" />

          <Skeleton className="h-8 w-10 rounded-md hidden md:block" />
        </div>
      </CardContent>
    </Card>
  );
};
