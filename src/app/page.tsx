"use client";

import { useCtx } from "@/frontend/AppContext";
import { LogoutButton } from "@/frontend/components/LogoutButton";
import { PostForm } from "@/frontend/components/PostForm";
import { SubscribeButton } from "@/frontend/components/SubscribeButton";
import { LoginButton } from "@/frontend/components/LoginButton";
import { LoginState } from "@/frontend/useLoginState";
import "./globals.css";

export default function Home() {
  const { loginState } = useCtx();

  return (
    <div className="w-full max-w-full overflow-hidden bg-gray-200 h-full flex flex-col items-center justify-center">
      <div className="w-[500px] md:max-w-[90%] bg-white p-8 rounded-xl shadow">
        <div className="text-2xl font-bold text-center mb-4">ZK Twitter</div>

        {loginState ? (
          <LoggedinView loginState={loginState} />
        ) : (
          <LoggedOutView />
        )}
      </div>
    </div>
  );
}

function LoggedinView({ loginState }: { loginState: LoginState }) {
  return (
    <div className="flex flex-col gap-2">
      <SubscribeButton />
      <LogoutButton />
      <PostForm loginState={loginState} />
    </div>
  );
}

function LoggedOutView() {
  return (
    <div className="flex flex-col gap-2">
      <SubscribeButton />
      <LoginButton />
    </div>
  );
}
