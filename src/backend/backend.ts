"use server";

import { WATERMARK } from "@/shared/shared";
import { ZResult, err, getErrorMessage, succ } from "@/shared/util";
import { PopupActionResult } from "@pcd/passport-interface";
import { ZKEdDSAEventTicketPCD } from "@pcd/zk-eddsa-event-ticket-pcd";
import { ETHBERLIN04 } from "@pcd/zuauth";
import { authenticate } from "@pcd/zuauth/server";
import { kv } from "@vercel/kv";
import { makePodTweet, saveTweet } from "./tweets";

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
    return succ({ token: makeToken(pcd) });
  } catch (e) {
    return err("authentication failed: " + getErrorMessage(e));
  }
}

export async function createPost(
  token: string,
  post: Post
): Promise<ZResult<Post>> {
  if (!checkToken(token)) {
    return err("invalid token");
  }

  await saveTweet(await makePodTweet(post));
  return succ(post);
}

const CORRECT_TOKEN = "token";

function makeToken(pcd: ZKEdDSAEventTicketPCD): string {
  return CORRECT_TOKEN;
}

function checkToken(token: string): boolean {
  return token === CORRECT_TOKEN;
}
