"use client";

import { createPost } from "@/backend/backend";
import { useCallback, useState } from "react";
import { LoginState } from "../useLoginState";
import { Button } from "@/components/ui/button";

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
    <div>
      create a new post:
      <div>
        <input
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <input
          type="text"
          placeholder="image url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <br />
        <textarea
          placeholder="say something interesting"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <br />
        <Button onClick={onCreateClick}>create</Button>
      </div>
    </div>
  );
}
