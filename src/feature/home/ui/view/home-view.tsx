import React from "react";
import { DailogPopUp } from "../components/dailog-pop-up";
import { PostList } from "../components/post-list";

export const HomeView = () => {
  return (
    <div className=" w-full flex justify-center items-center flex-col h-full">
      <div className=" w-full h-full flex flex-col md:flex-row px-4 md:p-2 max-w-6xl gap-y-2 rounded-xl gap-x-3">
        <div className=" w-full flex-0 flex justify-end">
          <DailogPopUp />
        </div>
        <div
          className="w-full flex-1 h-full max-w-4xl mx-auto 
     flex flex-col justify-start 
     px-2 py-3 rounded-md 
     overflow-y-auto gap-y-5 bar max-h-195 md:max-h-208 mask-b-from-90% mask-t-from-98%"
        >
          <PostList />
        </div>
      </div>
    </div>
  );
};
