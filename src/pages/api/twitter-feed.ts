import {
  ListFeedsRequest,
  ListFeedsResponseValue,
  PollFeedResponseValue,
  CredentialRequest
} from "@pcd/passport-interface";
import { PCDPermissionType } from "@pcd/pcd-collection";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ListFeedsResponseValue | PollFeedResponseValue>
) {
  await NextCors(req, res, {
    // Options
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    origin: "*",
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.method === "GET") {
    res.status(200).json(handleListFeed());
  } else if (req.method === "POST") {
    res.status(404);
  }
}

function handleListFeed(): ListFeedsResponseValue {
  return {
    feeds: [
      {
        id: "twitter",
        name: "Twitter",
        description: "Twitter",
        permissions: [
          { folder: "ZK-Twitter", type: PCDPermissionType.AppendToFolder },
          { folder: "ZK-Twitter", type: PCDPermissionType.AppendToFolder },
          { folder: "ZK-Twitter", type: PCDPermissionType.AppendToFolder }
        ],
        credentialRequest: {
          signatureType: "sempahore-signature-pcd",
          pcdType: "email-pcd"
        }
      }
    ],
    providerName: "zk-twitter",
    providerUrl: "http://localhost:4001"
  };
}
