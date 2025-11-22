import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <div className=" w-full h-screen flex items-center justify-center ">
      <Empty className=" flex flex-col gap-y-6">
        <EmptyHeader>
          <EmptyTitle className=" animate-pulse text-2xl">
            404 - Not Found
          </EmptyTitle>
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist. Try searching
            for what you need below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent className=" flex flex-col gap-y-6">
          <Button className=" h-8 bg-linear-0 from-primary via-chart-2 to-chart-5 text-shadow-xs">
            <Link href={"/"} className=" font-semibold ">
              Go to Home page
            </Link>
          </Button>
          <EmptyDescription>
            Home to home page?{" "}
            <Link href={"/"} className=" font-semibold text-chart-2">
              Home
            </Link>
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default Page;
