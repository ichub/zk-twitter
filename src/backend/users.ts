import {
  ZKEdDSAEventTicketPCD,
  ZKEdDSAEventTicketPCDPackage
} from "@pcd/zk-eddsa-event-ticket-pcd";
import { kv } from "@vercel/kv";
import { v4 as uuid } from "uuid";

export async function makeAndSaveToken(
  pcd: ZKEdDSAEventTicketPCD
): Promise<string> {
  const newToken = uuid();
  kv.set(newToken, await ZKEdDSAEventTicketPCDPackage.serialize(pcd));
  return newToken;
}

export async function getTokenUser(
  token: string
): Promise<ZKEdDSAEventTicketPCD | undefined> {
  const user = await kv.get<string>(token);

  if (user) {
    return await ZKEdDSAEventTicketPCDPackage.deserialize(user);
  }

  return undefined;
}

export const CORRECT_TOKEN = "token";
