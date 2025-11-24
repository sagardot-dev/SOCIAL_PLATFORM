"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { UserSchema } from "@/lib/schema";
import { GenAvatarImage } from "@/components/global/generate-avavtar";
import { useGetSignUrlMutation } from "@/lib/get-signurl";
import axios from "axios";
import { CustomToast } from "@/components/global/custom-toast";
import Image from "next/image";
import { CameraIcon } from "lucide-react";
import { s3URL } from "@/const ";

export const CardComponent = () => {
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState("");
  const signUrlMutation = useGetSignUrlMutation();
  const { data: session } = authClient.useSession();

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: session?.user.name || "",
      email: session?.user?.email || "",
      image: session?.user?.image || "",
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
          console.log(data);
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

  useEffect(() => {
    if (session?.user) {
      form.reset({
        name: session?.user.name,
        email: session?.user.email,
        image: session?.user.image || "",
      });
    }
  }, [session, form]);

  const pending = signUrlMutation.isPending || loading;

  function onSubmit(values: z.infer<typeof UserSchema>) {
    console.log(values);
    setLoading(true);
    authClient.updateUser(
      {
        name: values.name,
        image: values.image,
      },
      {
        onError: (err) => {
          CustomToast("Cant update the data", err.error.message);
          setLoading(false);
        },
        onSuccess: () => {
          CustomToast("Updated", "user data update successfully");
          setLoading(false);
        },
      }
    );
  }

  if (!session) return;

  return (
    <Card className=" py-13! px-1 min-w-xs md:min-w-md mx-auto">
      <CardHeader className="flex flex-col justify-center items-center">
        <CardTitle className="md:text-2xl font-bold">
          Update Your Profile
        </CardTitle>
        <p className="text-muted-foreground ">Your profile information</p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-4">
                <div className="w-full flex items-center justify-center">
                  <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            id="userImageInput"
                            onChange={onUpload}
                          />
                        </FormControl>
                        <div className="border  p-1 rounded-full border-primary/40  w-full relative">
                          <div className="border p-1 rounded-full bg-linear-to-b from-primary to-chart-2/80">
                            <Button
                              variant={"outline"}
                              className=" absolute rounded-full -bottom-2 -right-3 z-10"
                              disabled={pending}
                              type="button"
                              size={"icon-sm"}
                              onClick={() =>
                                document
                                  .getElementById("userImageInput")
                                  ?.click()
                              }
                            >
                              <CameraIcon className="text-accent-foreground size-4" />
                            </Button>
                            {!preview && !session?.user?.image ? (
                              GenAvatarImage({
                                name: session?.user?.name || "unknown",
                              })
                            ) : (
                              <Image
                                src={`${s3URL}/${session.user.image}`}
                                width={39}
                                height={39}
                                alt="preview"
                                className="rounded-full"
                              />
                            )}
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Username</FormLabel>
                      <FormControl>
                        <Input
                          disabled={pending}
                          placeholder={session?.user?.name}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={true}
                          className=""
                          placeholder={session?.user?.email}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button disabled={pending} type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>

        {/* Account Information Section */}
        <div className="space-y-4 pt-6  border-t border-accent-foreground/30">
          <h3 className="text-xl font-semibold text-sidebar-foreground/30 ">
            Account Information
          </h3>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-chat-1">
              <span className="text-chat-1 text-sm">Member Since</span>
              <span className="text-chat-1 text-sm">
                {new Date(session?.user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-chat-1 text-sm">Account Status</span>

              <Badge variant="default" className="">
                Active
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter></CardFooter>
    </Card>
  );
};
