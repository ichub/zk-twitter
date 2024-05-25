import { getEdDSAPublicKey, newEdDSAPrivateKey } from "@pcd/eddsa-pcd";
import { PCD, SerializedPCD } from "@pcd/pcd-types";
import { POD, podEntriesFromSimplifiedJSON } from "@pcd/pod";
import { PODPCD, PODPCDClaim, PODPCDPackage, PODPCDProof } from "@pcd/pod-pcd";
import { v4 as uuid } from "uuid";

const privateKey = newEdDSAPrivateKey();
const publicKey = getEdDSAPublicKey(privateKey);

export async function getTestTweet(): Promise<PODPCD> {
  const newPOD = new PODPCD(
    uuid(),
    POD.sign(
      podEntriesFromSimplifiedJSON(`{
      "zupass_display": "collectable",
      "zupass_image_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Felis_catus-cat_on_snow.jpg/358px-Felis_catus-cat_on_snow.jpg",
      "zupass_title": "friendly kitty",
      "zupass_description": "friendly kitty says hello",
      "owner": 18711405342588116796533073928767088921854096266145046362753928030796553161041
    }`),
      privateKey
    )
  );

  return newPOD;
}

export async function getTestTweets(): Promise<
  SerializedPCD<PCD<PODPCDClaim, PODPCDProof>>[]
> {
  const testTweet = await getTestTweet();
  return [await PODPCDPackage.serialize(testTweet)];
}
