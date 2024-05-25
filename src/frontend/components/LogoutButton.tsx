"use client";

import { Button } from "@/components/ui/button";
import { useCtx } from "../AppContext";

export function LogoutButton() {
  const ctx = useCtx();
  return (
    <Button
      className="w-full"
      onClick={() => {
        ctx.update({ loginState: undefined });
      }}
    >
      Logout
    </Button>
  );
}
