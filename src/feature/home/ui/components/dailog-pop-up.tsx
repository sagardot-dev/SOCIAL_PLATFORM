import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React from "react";
import { PostForm } from "./post-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const DailogPopUp = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          Create Post
          <Plus className=" size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent forceMount className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>What do you like to post today?</DialogDescription>
        </DialogHeader>

        <PostForm />
      </DialogContent>
    </Dialog>
  );
};
