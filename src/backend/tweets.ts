import { SIGNING_KEY } from "@/backend/env";
import { PCD, SerializedPCD } from "@pcd/pcd-types";
import { POD, podEntriesFromSimplifiedJSON } from "@pcd/pod";
import { PODPCD, PODPCDClaim, PODPCDPackage, PODPCDProof } from "@pcd/pod-pcd";
import { v4 as uuid } from "uuid";
import { Post } from "./backend";
import { kv } from "@vercel/kv";

export async function makePodTweet(
  post: Post
): Promise<SerializedPCD<PCD<PODPCDClaim, PODPCDProof>>> {
  const newPOD = new PODPCD(
    uuid(),
    POD.sign(
      podEntriesFromSimplifiedJSON(
        JSON.stringify({
          zupass_display: "collectable",
          zupass_image_url: post.imageUrl,
          zupass_title: post.title,
          zupass_description: post.content
        })
      ),
      SIGNING_KEY
    )
  );

  return await PODPCDPackage.serialize(newPOD);
}

const POSTS_KV_KEY = "posts";

export async function getAllTweets(): Promise<
  SerializedPCD<PCD<PODPCDClaim, PODPCDProof>>[]
> {
  const set = await kv.smembers<SerializedPCD<PCD<PODPCDClaim, PODPCDProof>>[]>(
    POSTS_KV_KEY
  );

  return set;
}

export async function saveTweet(
  postPCD: SerializedPCD<PCD<PODPCDClaim, PODPCDProof>>
): Promise<void> {
  await kv.sadd(POSTS_KV_KEY, JSON.stringify(postPCD));
}

export async function deleteAllTweets() {
  await kv.del(POSTS_KV_KEY);
}
