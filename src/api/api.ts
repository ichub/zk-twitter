"use server";

import { WATERMARK } from '@/util/shared';
import { APIResult, err, succ } from '@/util/util';
import { PopupActionResult } from '@pcd/passport-interface';
import { ZKEdDSAEventTicketPCD } from '@pcd/zk-eddsa-event-ticket-pcd';
import { ETHBERLIN04 } from '@pcd/zuauth';
import { authenticate } from "@pcd/zuauth/server";

export async function getValue(): Promise<number> {
  return 5;
}

export interface AuthResult {
  token: string;
}

export async function auth(result: PopupActionResult): Promise<APIResult<AuthResult>> {
  if (result.type !== "pcd") {
    return err("wrong result type");
  }

  try {
    const pcd = await authenticate(result.pcdStr, WATERMARK.toString(), ETHBERLIN04);
    return succ({ token: makeToken(pcd) });
  } catch (e) {
    return err("authentication failed");
  }
}

const CORRECT_TOKEN = "token";

function makeToken(pcd: ZKEdDSAEventTicketPCD): string {
  return CORRECT_TOKEN;
}

function checkToken(token: string): boolean {
  return token === CORRECT_TOKEN;
}
