import { PostCardSkeleton } from "./card-skeleton";

export function PostCardSkeletonGrid() {
  return (
    <div
      className="
        grid md:grid-cols-3 gap-4 
        auto-rows-[1fr] py-6 
        overflow-y-auto bar 
        mask-b-from-90% mask-t-from-98%
      "
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="flex justify-start gap-y-2 gap-x-3 items-start flex-wrap"
        >
          <PostCardSkeleton />
        </div>
      ))}
    </div>
  );
}
