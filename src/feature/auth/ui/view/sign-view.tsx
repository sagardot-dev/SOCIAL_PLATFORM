"use client";
import React, { useState } from "react";
import { CardWrapper } from "../components/card-warpper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterForm } from "../components/register-form";
import { LoginForm } from "../components/login-form";

//  children,
//  headerlabel,
//  backButtonlable,
// backButtonherf,

export const SignInView = () => {
  const [tab, setTab] = useState<"register" | "login">("register");

  return (
    <div className=" w-full min-h-screen pt-20 flex justify-center relative">
      <div className=" max-w-7xl mx-auto flex-col flex gap-y-6">
        <div className=" flex flex-col justify-center items-center gap-y-1 ">
          <h1 className=" text-4xl font-bold tracking-tight ">Social</h1>
          <p className=" text-base text-balance text-secondary/50">
            Connect with frineds and share your moments
          </p>
        </div>
        <Tabs
          className=" w-full "
          value={tab}
          onValueChange={(value) => setTab(value as "login" | "register")}
        >
          <TabsList className=" min-w-md bg-accent/50 backdrop-blur-sm p-p border border-border/50 rounded-full  mb-2 h-11">
            <TabsTrigger className=" rounded-full" value="login">
              Login
            </TabsTrigger>
            <TabsTrigger className=" rounded-full" value="register">
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="register">
            <CardWrapper headerlabel="Enter your credentials to access your account ">
              <RegisterForm onSuccessSwitch={() => setTab("login")} />
            </CardWrapper>
          </TabsContent>

          <TabsContent value="login">
            <CardWrapper headerlabel="Enter your credentials to access your account ">
              <LoginForm />
            </CardWrapper>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
