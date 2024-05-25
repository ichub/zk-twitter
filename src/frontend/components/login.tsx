"use client";

import { AuthResult, auth } from "@/backend/auth";
import { WATERMARK } from "@/shared/shared";
import { ZResult, err, getErrorMessage } from "@/shared/util";
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
            const authValue = await auth(popupResult);
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
