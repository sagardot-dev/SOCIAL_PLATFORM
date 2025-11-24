import { LoadingState } from "@/components/global/loading-state";
import { HomeView } from "@/feature/home/ui/view/home-view";
import Hydrate from "@/lib/helpers/hydrate-client";
import { getSession } from "@/lib/session/check-session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Home() {
  const session = await getSession();

  if (!session?.user || !session) {
    redirect("/auth/sign-in");
    return null;
  }
  return (
    <Hydrate>
      <Suspense
        fallback={
          <LoadingState
            title="loading home page"
            description="please wait for a sec"
          />
        }
      >
        <HomeView />
      </Suspense>
    </Hydrate>
  );
}
