"use client";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useDeletePost } from "../../server/use-delete-post";

export function CardActions({ postId }: { postId: string }) {
  const deletePostMutation = useDeletePost();
  const pending = deletePostMutation.isPending;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled={pending} asChild>
        <button className="bg-accent p-1 rounded-sm">
          <MoreVertical className="size-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-46" align="start">
        <DropdownMenuLabel>Edit Post</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              deletePostMutation.mutate({ postId });
            }}
          >
            Delete
            <DropdownMenuShortcut>
              <Trash2 className="" />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          {!postId && (
            <DropdownMenuItem>
              Edit Post
              <DropdownMenuShortcut>
                <Pencil />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
