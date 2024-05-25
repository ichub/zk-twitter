import { NODE_ENV } from "@/backend/env";
import { getAllTweets } from "@/backend/tweets";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

export const FOLDER_NAME = "ZK Twitter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (NODE_ENV === "production") {
    res.status(404).send("Not found");
    return;
  }

  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200
  });

  res.status(200).json(await getAllTweets());
}
