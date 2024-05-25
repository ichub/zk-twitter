"use client";

import { Button } from "@/components/ui/button";
import { useCtx } from "../AppContext";

export function Logout() {
  const ctx = useCtx();
  return (
    <Button
      onClick={() => {
        ctx.update({ loginState: undefined });
      }}
    >
      logout
    </Button>
  );
}
