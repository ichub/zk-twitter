"use client";

import { AuthResult, auth } from "@/app/api/api";
import { WATERMARK } from "@/util/shared";
import { ZResult, err, getErrorMessage } from "@/util/util";
import { ZKEdDSAEventTicketPCDPackage } from "@pcd/zk-eddsa-event-ticket-pcd";
import { ETHBERLIN04, ZuAuthArgs, zuAuthPopup } from "@pcd/zuauth";
import { useState } from "react";

const LOGIN_CONFIG: ZuAuthArgs = {
  fieldsToReveal: {
    revealAttendeeEmail: true,
    revealAttendeeName: true,
    revealEventId: true
  },
  watermark: WATERMARK,
  config: ETHBERLIN04,
  returnUrl: "http://localhost:4001"
};

export function Login() {
  const [authResult, setAuthResult] = useState<ZResult<AuthResult> | undefined>(
    undefined
  );

  return (
    <div>
      <button
        onClick={async () => {
          try {
            const popupResult = await zuAuthPopup(LOGIN_CONFIG);
            console.log(popupResult);
            const zkProof = await ZKEdDSAEventTicketPCDPackage.deserialize(
              JSON.parse((popupResult as any).pcdStr).pcd
            );
            const verified = await ZKEdDSAEventTicketPCDPackage.verify(zkProof);
            console.log("verified", verified);

            const authValue = await auth(popupResult);
            console.log(authValue);
            setAuthResult(authValue);
          } catch (e) {
            setAuthResult(err(getErrorMessage(e)));
          }
        }}
      >
        login
      </button>

      {authResult && (
        <>
          {authResult.success ? <>success {authResult.data.token}</> : "error"}
        </>
      )}
    </div>
  );
}
