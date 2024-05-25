"use client";

import { createPost } from "@/backend/backend";
import { useCallback, useState } from "react";
import { LoginState } from "../useLoginState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function PostForm({ loginState }: { loginState: LoginState }) {
  const [title, setTitle] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const onCreateClick = useCallback(async () => {
    try {
      await createPost(loginState.token, { title, imageUrl, content });
      alert("created post");
    } catch (e) {
      console.error(e);
    }
  }, [loginState.token, title, imageUrl, content]);

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="text"
        placeholder="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Input
        type="text"
        placeholder="image url"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <Textarea
        placeholder="say something interesting"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button onClick={onCreateClick}>Post</Button>
    </div>
  );
}
