"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { PostForm } from "./post-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const DailogPopUp = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Create Post
          <Plus className=" size-4" />
        </Button>
      </DialogTrigger>

      <DialogContent
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        forceMount
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>What do you like to post today?</DialogDescription>
        </DialogHeader>

        <PostForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
