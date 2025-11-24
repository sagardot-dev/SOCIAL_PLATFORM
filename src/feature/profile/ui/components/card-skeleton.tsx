import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PostCardSkeleton() {
  return (
    <Card className="w-full rounded-xl shadow-sm border border-border min-w-xs gap-3 pt-6">
      <CardHeader className="flex flex-row gap-3 items-center">
        <Skeleton className="h-11 w-11 rounded-full" />

        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-20" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4 w-full">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />

        <div className="border-t my-2" />

        <div className="flex items-center justify-between">
          <div className="flex items-center md:gap-2 shrink md:mr-2">
            <Skeleton className="h-8 w-14 rounded-md" />
            <Skeleton className="h-8 w-10 rounded-md" />
          </div>

          <Skeleton className="h-8 w-10 rounded-md hidden md:block" />
        </div>
      </CardContent>
    </Card>
  );
}
