import { deleteAllTweets } from "@/backend/tweets";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

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

  await deleteAllTweets();

  res.status(200).send("ok");
}
