import { ModeToggle } from "@/components/global/mode-toggle";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#1DA1F22e_1px,transparent_1px),linear-gradient(to_bottom,#1DA1F22e_1px,transparent_1px)] bg-size-[44px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-2 opacity-75"></div>

      {children}
    </div>
  );
};

export default layout;
