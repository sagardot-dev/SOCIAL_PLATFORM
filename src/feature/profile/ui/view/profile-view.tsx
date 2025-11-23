"use client";
import React from "react";
import { ProfileHeader } from "../components/profile-header";
import { PostCard } from "../components/post-card";
import { useGetUserPosts } from "../../server/useget-userpost";

export const ProfileView = () => {
  const userPostQuery = useGetUserPosts();
  const { data, isLoading } = userPostQuery;

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className=" w-full flex justify-start items-center  flex-col h-full max-w-6xl mx-auto space-y-5">
      <div className=" w-full flex ">
        <ProfileHeader
          totalPosts={data?.data?._count.post}
          totalComments={data?.data?._count.comments}
          totalReactions={data?.data?._count.reactions}
        />
      </div>
      <div
        className="grid grid-cols-3 gap-4 overflow-y-auto bar 
                mask-b-from-90% mask-t-from-98% max-h-150 py-6
                auto-rows-[1fr]"
      >
        {data?.data?.post.length === 0 && <p>No post create yet</p>}
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
    </div>
  );
};
