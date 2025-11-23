"use client";

import { useGetSignUrlMutation } from "@/lib/get-signurl";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React, { ChangeEvent, useEffect, useState } from "react";
import { CommentSchema } from "@/lib/schema";

import { CustomToast } from "@/components/global/custom-toast";
import Image from "next/image";
import { CameraIcon, Send, XIcon } from "lucide-react";
import { useCreateComment } from "../../server/use-create-comment";

export const CommentForm = ({ postId }: { postId: string }) => {
  const commentMutation = useCreateComment();
  const signUrlMutation = useGetSignUrlMutation();
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      postId,
      content: "",
      image: "",
    },
  });

  useEffect(() => {
    form.setValue("postId", postId);
  }, [postId, form]);

  const onUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fileUrl = URL.createObjectURL(file);
    setPreview(fileUrl);
    const mime = file?.type || "application/octet-stream";
    const ext = file.name.split(".").pop() || "bin";
    const fileName = file.name.split(".")[0];

    signUrlMutation.mutate(
      { fileName, ext, type: mime },
      {
        onError: () => {
          return;
        },
        onSuccess: async (data) => {
          console.log(data);
          const res = await axios.put(data.data, file, {
            headers: { "Content-Type": file.type },
          });
          const signedUrl = data.data;
          const publicUrl = signedUrl.split("?")[0];
          form.setValue("image", publicUrl);
          if (res.statusText === "OK") {
            CustomToast("Upload successfully", "your image is uploaded!");
          }
        },
      }
    );
  };

  const pending =
    signUrlMutation.isPending || loading || commentMutation.isPending;

  async function onSubmit(values: z.infer<typeof CommentSchema>) {
    console.log(form);
    setLoading(true);
    commentMutation.mutate(
      {
        postId,
        content: values.content,
        image: values.image,
      },
      {
        onError: (error) => {
          console.log(error);
          setLoading(false);
        },
        onSuccess: () => {
          setLoading(false);
          form.reset();
          setPreview("");
        },
      }
    );
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, (error) => {
          console.log(error);
        })}
        className="space-y-7 w-full flex flex-1"
      >
        <div className="grid grid-cols-4 md:gap-x-2 gap-x-1 justify-center items-center w-full">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className=" col-span-3">
                <FormControl>
                  <Input
                    className=" rounded-sm w-full "
                    disabled={loading}
                    placeholder="What is on your mind"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className=" flex gap-x-1 md:gap-x-2">
            {!preview && (
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <div className=" md:flex-row flex flex-col gap-y-5 gap-x-2 md:items-center items-start">
                        <Input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="cameraInput"
                          onChange={(e) => {
                            onUpload(e);
                            
                          }}
                        />
                        <Button
                          size={"sm"}
                          disabled={pending}
                          type="button"
                          onClick={() =>
                            document.getElementById("cameraInput")?.click()
                          }
                          className=""
                        >
                          <CameraIcon className=" size-3 text-secondary" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            {preview && (
              <div className=" relative flex justify-center items-center">
                <XIcon
                  onClick={() => {
                    setPreview("");
                  }}
                  className=" bg-destructive p-px size-3.5 absolute -top-3 -right-2 text-background rounded-full border "
                />
                <Image
                  src={preview}
                  width={33}
                  height={33}
                  alt="logo"
                  className=""
                />
              </div>
            )}
            <Button size={"sm"} disabled={loading} type="submit">
              <Send className=" size-3" />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
