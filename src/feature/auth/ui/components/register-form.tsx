"use client";

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

import React, { useState } from "react";
import { RegisterSchema } from "@/lib/schema";
import { authClient } from "@/lib/auth-client";
import { CustomToast } from "@/components/global/custom-toast";
import { FormError, FormSuccess } from "./form-message";

export const RegisterForm = ({
  onSuccessSwitch,
}: {
  onSuccessSwitch: () => void;
}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      profilePic: "",
    },
  });
  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
     await authClient.signUp.email(
      {
        email: values.email,
        name: values.username,
        password: values.password,
        image: values.profilePic,
      },
      {
        onRequest: () => {
          CustomToast("Submiting the data", "Please wait for a sec");
          setLoading(true);
          setError("");
          setSuccess("");
        },
        onSuccess: (ctx) => {
          CustomToast(
            ctx.data.message || "Register successfully",
            "Redirecting to Login from"
          );
          setSuccess(ctx.data.message || "Register successful");
          setError("");
          setLoading(false);
          onSuccessSwitch();
        },
        onError: (ctx) => {
          setError(
            ctx.error.error || ctx.error?.message || "Something Went Wrong!"
          );
          setSuccess("");
          setLoading(false);
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Mr. jack"
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="jack@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="password"
                      placeholder="******"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="profilePic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture URL(optional)</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="https://example.com/your-pic.jpg"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormSuccess message={success} />
            <FormError message={error} />
          </div>
          <Button disabled={loading} className=" w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};
