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

  const validateInput = useCallback(() => {
    if (title.length === 0) {
      return "Please enter a title";
    }

    if (content.length === 0) {
      return "Please post something interesting (:";
    }

    if (imageUrl.length !== 0) {
      try {
        const url = new URL(imageUrl);
      } catch (e) {
        return "The image URL is optional. Please enter a valid URL if you want to post an image.";
      }
    }
  }, [content, imageUrl, title]);

  const onCreateClick = useCallback(async () => {
    try {
      const error = validateInput();
      if (error) {
        alert(error);
        return;
      }

      await createPost(loginState.token, { title, imageUrl, content });
      alert("created post");
    } catch (e) {
      console.error(e);
    }
  }, [validateInput, loginState.token, title, imageUrl, content]);

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
        placeholder="image url (optional)"
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
