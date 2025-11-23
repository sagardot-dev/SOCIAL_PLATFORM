"use client";

import React from "react";
import { useGetPosts } from "../../server/use-get-posts";
import { PostCard } from "./post-card";

export const PostList = () => {
  const query = useGetPosts();

  if (query.isLoading) return <div>Loading posts...</div>;
  if (query.isError) return <div>Failed to load posts.</div>;

  const posts = query.data;
  if (!posts) return null;

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
