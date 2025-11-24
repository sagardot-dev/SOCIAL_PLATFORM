"use client";
import { DehydratedState, HydrationBoundary } from "@tanstack/react-query";

export default function Hydrate({
  children,
  state,
}: {
  children: React.ReactNode;
  state?: DehydratedState;
}) {
  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
