import { LoadingState } from "@/components/global/loading-state";
import { SettingsView } from "@/feature/settings/ui/view/home-view";
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
            title="loading settings"
            description="please wait a second…"
          />
        }
      >
        <SettingsView />
      </Suspense>
    </Hydrate>
  );
}
