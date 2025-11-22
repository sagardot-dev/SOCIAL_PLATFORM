import React from "react";
import { DailogPopUp } from "../components/dailog-pop-up";

export const HomeView = () => {
  return (
    <div className=" w-full flex justify-center items-center flex-col h-full">
      <div className=" w-full flex min-h-0 px-4 md:p-2 max-w-6xl flex-col gap-y-3 rounded-xl">
        <div className=" w-full flex justify-end">
          <DailogPopUp />
        </div>
        <div className=" w-full max-w-6xl mx-auto flex justify-center items-center p-2 border">
            hi
        </div>
      </div>
    </div>
  );
};
