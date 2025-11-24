"use client";
import React from "react";
import { ProfileHeader } from "../components/profile-header";
import { PostCard } from "../components/post-card";
import { useGetUserPosts } from "../../server/useget-userpost";
import { ProfileHeaderSkeleton } from "../components/header-skeleton";
import { PostCardSkeletonGrid } from "../components/post-grid-skeleton";
import { useGetparams } from "../../hooks/params";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EmptyState } from "@/components/global/empty-state";

export const ProfileView = () => {
  const [{ page }, setParams] = useGetparams();
  const userPostQuery = useGetUserPosts(page);
  const { data, isLoading } = userPostQuery;
  console.log(data);

  const handlePrevPage = () => {
    if (page > 1) {
      setParams({ page: page - 1 });
    }
  };

  const handleNextPage = () => {
    const postsPerPage = 10;
    const hasMorePosts =
      data?.data?.post && data.data.post.length === postsPerPage;
    if (hasMorePosts) {
      setParams({ page: page + 1 });
    }
  };

  if (isLoading)
    return (
      <div className="w-full flex flex-col items-center h-full max-w-6xl mx-auto space-y-5 px-4">
        <ProfileHeaderSkeleton />
        <PostCardSkeletonGrid />
      </div>
    );

  return (
    <div className=" w-full flex justify-start items-center  flex-col h-full max-w-6xl mx-auto space-y-5 px-4 pb-8 ">
      <div className=" w-full flex ">
        <ProfileHeader
          totalPosts={data?.data?._count.post}
          totalComments={data?.data?._count.comments}
          totalReactions={data?.data?._count.reactions}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 flex-1 gap-4 overflow-y-auto bar  mask-b-from-90% mask-t-from-98% max-h-120 py-6 auto-rows-[1fr] place-items-center ">
        {data?.data?.post.length === 0 && (
          <div className=" col-span-3">
            <EmptyState
              title="No content yet"
              description="please create post to see constnt"
            />
          </div>
        )}
        {data?.data?.post.map((p) => (
          <div
            className=" flex justify-start gap-y-2 gap-x-3 items-start flex-wrap"
            key={p.id}
          >
            <PostCard
              id={p.id}
              content={p.content}
              image={p.image}
              createdAt={p.createdAt}
              commentsCount={p._count.comments}
              reactionsCount={p._count.reactions}
            />
          </div>
        ))}
      </div>
      {data?.data && (
        <div className="flex items-center justify-center gap-4 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrevPage}
            disabled={page === 1}
            className="gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <span className="text-sm text-muted-foreground">Page {page}</span>

          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={!data?.data?.post || data.data.post.length < 10}
            className="gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
