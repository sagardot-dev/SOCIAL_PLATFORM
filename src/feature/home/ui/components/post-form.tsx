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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import React, { ChangeEvent, useState } from "react";
import { PostSchema } from "@/lib/schema";

import { CustomToast } from "@/components/global/custom-toast";
import {
  FormError,
  FormSuccess,
} from "@/feature/auth/ui/components/form-message";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { CameraIcon, XIcon } from "lucide-react";
import { useCreatePost } from "../../server/use-create-post";

export const PostForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const postMutation = useCreatePost();
  const signUrlMutation = useGetSignUrlMutation();
  const [preview, setPreview] = useState("");
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: "",
      image: "",
    },
  });

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
          const res = await axios.put(data.data, file, {
            headers: { "Content-Type": file.type },
          });
          const signedUrl = data.data;
          const key = signedUrl.split(".amazonaws.com/")[1].split("?")[0];
          form.setValue("image", key);
          if (res.statusText === "OK") {
            CustomToast("Upload successfully", "your image is uploaded!");
          }
        },
      }
    );
  };

  const pending =
    signUrlMutation.isPending || loading || postMutation.isPending;

  async function onSubmit(values: z.infer<typeof PostSchema>) {
    console.log(values);
    setLoading(true);
    setSuccess("");
    setError("");
    postMutation.mutate(
      {
        content: values.content,
        image: values.image,
      },
      {
        onError: (error) => {
          console.log(error);
          setError(error?.message || "error occur");
          setSuccess("");
          setLoading(false);
        },
        onSuccess: (data) => {
          setSuccess(data.title);
          setLoading(false);
          setError("");
          onSuccess?.(); 
          form.reset();
        },
      }
    );
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7">
          <div className=" flex-col flex gap-y-4">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      className=" rounded-sm h-25 resize-none bar"
                      disabled={loading}
                      placeholder="What is on your mind"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" w-full flex justify-between items-center">
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
                          disabled={pending}
                          type="button"
                          onClick={() =>
                            document.getElementById("cameraInput")?.click()
                          }
                          className=""
                        >
                          <CameraIcon className=" text-accent size-4" />
                        </Button>
                        <p className=" text-xs text-accent-foreground/50">
                          Upload image
                        </p>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {preview && (
                <div className=" relative">
                  <XIcon
                    onClick={() => {
                      setPreview("");
                    }}
                    className=" bg-destructive p-px size-3.5 absolute -top-3 -right-2 text-background rounded-full border "
                  />
                  <Image
                    src={preview}
                    width={29}
                    height={29}
                    alt="logo"
                    className=""
                  />
                </div>
              )}
            </div>

            <FormSuccess message={success} />
            <FormError message={error} />
          </div>
          <Button disabled={pending} className=" w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
