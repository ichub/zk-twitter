import { getTestTweets } from "@/backend/testTweet";
import {
  ListFeedsResponseValue,
  PollFeedRequest,
  PollFeedResponseValue
} from "@pcd/passport-interface";
import { PCDActionType, PCDPermissionType } from "@pcd/pcd-collection";
import NextCors from "nextjs-cors";
import type { NextApiRequest, NextApiResponse } from "next";


export const FOLDER_NAME = "ZK Twitter";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListFeedsResponseValue | PollFeedResponseValue>
) {
  await NextCors(req, res, {
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200
  });

  if (req.method === "GET") {
    res.status(200).json(handleListFeed());
  } else if (req.method === "POST") {
    res.status(200).json(await handlePollFeed(req.body));
  }
}

async function handlePollFeed(
  req: PollFeedRequest
): Promise<PollFeedResponseValue> {
  return {
    actions: [
      {
        type: PCDActionType.DeleteFolder,
        folder: FOLDER_NAME,
        recursive: false
      },
      {
        type: PCDActionType.AppendToFolder,
        folder: FOLDER_NAME,
        pcds: await getTestTweets()
      }
    ]
  };
}

function handleListFeed(): ListFeedsResponseValue {
  return {
    feeds: [
      {
        id: "twitter",
        name: "Twitter",
        description: "Twitter",
        permissions: [
          { folder: FOLDER_NAME, type: PCDPermissionType.AppendToFolder },
          { folder: FOLDER_NAME, type: PCDPermissionType.AppendToFolder },
          { folder: FOLDER_NAME, type: PCDPermissionType.AppendToFolder }
        ],
        credentialRequest: {
          signatureType: "sempahore-signature-pcd",
          pcdType: "email-pcd"
        }
      }
    ],
    providerName: FOLDER_NAME,
    providerUrl: "http://localhost:4001/api/twitter-feed"
  };
}
