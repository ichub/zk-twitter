"use client";

import { Button } from "@/components/ui/button";
import urlJoin from "url-join";

export function SubscribeButton() {
  return (
    <Button
      className="w-full"
      onClick={() => {
        window.location.href = `${"https://zupass.org"}/#/add-subscription?url=${encodeURIComponent(
          urlJoin(process.env.NEXT_PUBLIC_APP_URL ?? "", "/api/twitter-feed")
        )}`;
      }}
    >
      Subscribe to ZK Twitter on Zupass
    </Button>
  );
}
