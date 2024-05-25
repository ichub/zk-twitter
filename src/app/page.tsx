"use client";

import { useCtx } from "@/frontend/AppContext";
import { Logout } from "@/frontend/components/Logout";
import { PostForm } from "@/frontend/components/PostForm";
import { SubscribeButton } from "@/frontend/components/SubscribeButton";
import { Login } from "@/frontend/components/login";
import { LoginState } from "@/frontend/useLoginState";
import "./globals.css";

export default function Home() {
  const { loginState } = useCtx();

  return (
    <div className="">
      ZK TWITTER
      {loginState ? (
        <LoggedinView loginState={loginState} />
      ) : (
        <LoggedOutView />
      )}
    </div>
  );
}

function LoggedinView({ loginState }: { loginState: LoginState }) {
  return (
    <div>
      your token is: {loginState.token} <Logout />
      <br />
      <SubscribeButton />
      <br />
      <PostForm loginState={loginState} />
    </div>
  );
}

function LoggedOutView() {
  return (
    <div>
      <Login />
      <br />
      <SubscribeButton />
    </div>
  );
}
