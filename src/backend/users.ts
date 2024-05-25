import { ZKEdDSAEventTicketPCD } from "@pcd/zk-eddsa-event-ticket-pcd";

export function makeToken(pcd: ZKEdDSAEventTicketPCD): string {
  return CORRECT_TOKEN;
}
export function checkToken(token: string): boolean {
  return token === CORRECT_TOKEN;
}
export const CORRECT_TOKEN = "token";
