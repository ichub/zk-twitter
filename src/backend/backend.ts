"use server";

import { WATERMARK } from "@/shared/shared";
import { ZResult, err, getErrorMessage, succ } from "@/shared/util";
import { PopupActionResult } from "@pcd/passport-interface";
import { ETHBERLIN04 } from "@pcd/zuauth";
import { authenticate } from "@pcd/zuauth/server";
import { makePodTweet, saveTweet } from "./tweets";
import { makeAndSaveToken } from "./users";
import { getTokenUser } from "./users";

export interface AuthResult {
  token: string;
}

export interface Post {
  title: string;
  imageUrl: string;
  content: string;
}

export async function auth(
  result: PopupActionResult
): Promise<ZResult<AuthResult>> {
  if (result.type !== "pcd") {
    return err("wrong result type");
  }

  try {
    const pcd = await authenticate(
      result.pcdStr,
      WATERMARK.toString(),
      ETHBERLIN04
    );
    return succ({ token: await makeAndSaveToken(pcd) });
  } catch (e) {
    return err("authentication failed: " + getErrorMessage(e));
  }
}

export async function createPost(
  token: string,
  post: Post
): Promise<ZResult<Post>> {
  console.log("poasting XD");

  const user = await getTokenUser(token);

  console.log("poasting", post, user);

  if (!user) {
    return err("invalid token");
  }

  const commitment = user.claim.partialTicket.attendeeSemaphoreId;

  if (!commitment) {
    return err("user has no commitment");
  }

  await saveTweet(await makePodTweet(post, commitment));

  return succ(post);
}
