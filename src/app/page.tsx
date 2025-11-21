import { ModeToggle } from "@/components/global/mode-toggle";
import prisma from "@/lib/db/prisma";

export default function Home() {
  return (
   <div>
    <ModeToggle/> this is font text
   </div>
  );
}
