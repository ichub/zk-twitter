"use client";

import { useCtx } from "@/frontend/AppContext";
import { Logout } from "@/frontend/components/Logout";
import { PostForm } from "@/frontend/components/PostForm";
import { Login } from "@/frontend/components/login";
import { LoginState } from "@/frontend/useLoginState";

export default function Home() {
  const { loginState } = useCtx();

  return (
    <div>
      ZK TWITTER
      {loginState ? <LoggedinView loginState={loginState} /> : <Login />}
    </div>
  );
}

function LoggedinView({ loginState }: { loginState: LoginState }) {
  return (
    <div>
      your token is: {loginState.token} <Logout />
      <br />
      <PostForm />
    </div>
  );
}
