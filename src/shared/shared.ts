export const WATERMARK = uuidToBigInt("89f4e976-a4d0-4dab-9800-612026e685af");

function uuidToBigInt(uuid: string): BigInt {
  const numericUUID = uuid.replace(/-/g, "");
  return BigInt("0x" + numericUUID);
}
