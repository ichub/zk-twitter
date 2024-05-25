import { getAllTweets } from "@/backend/tweets";
import {
  ListFeedsResponseValue,
  PollFeedResponseValue
} from "@pcd/passport-interface";
import NextCors from "nextjs-cors";
import type { NextApiRequest, NextApiResponse } from "next";

export const FOLDER_NAME = "ZK Twitter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200
  });

  res.status(200).json(await getAllTweets());
}
