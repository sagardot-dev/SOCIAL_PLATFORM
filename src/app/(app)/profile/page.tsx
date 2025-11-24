import { LoadingState } from "@/components/global/loading-state";
import { ProfileView } from "@/feature/profile/ui/view/profile-view";
import Hydrate from "@/lib/helpers/hydrate-client";
import { getSession } from "@/lib/session/check-session";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page() {
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
            title="loading profile"
            description="fetching your info…"
          />
        }
      >
        <ProfileView />
      </Suspense>
    </Hydrate>
  );
}
