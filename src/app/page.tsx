"use client";

import { useCtx } from "@/frontend/AppContext";
import { Logout } from "@/frontend/components/Logout";
import { Login } from "@/frontend/components/login";

export default function Home() {
  const { loginState } = useCtx();

  return (
    <div>
      ZK TWITTER
      {loginState ? (
        <div>
          your token is: {loginState.token} <Logout />
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
