"use client";

import { AuthResult, auth } from "@/backend/backend";
import { WATERMARK } from "@/shared/shared";
import { ZResult, err, getErrorMessage } from "@/shared/util";
import { ETHBERLIN04, ZuAuthArgs, zuAuthPopup } from "@pcd/zuauth";
import { useState } from "react";
import { useCtx } from "../AppContext";

const LOGIN_CONFIG: ZuAuthArgs = {
  fieldsToReveal: {
    revealAttendeeSemaphoreId: true
  },
  watermark: WATERMARK.toString(),
  config: ETHBERLIN04,
  returnUrl: "http://localhost:4001"
};

export function Login() {
  const [authResult, setAuthResult] = useState<ZResult<AuthResult> | undefined>(
    undefined
  );
  const ctx = useCtx();

  return (
    <div>
      <button
        onClick={async () => {
          try {
            const popupResult = await zuAuthPopup(LOGIN_CONFIG);
            const authValue = await auth(popupResult);
            if (authValue.success) {
              ctx.update({
                loginState: {
                  token: authValue.data.token
                }
              });
            } else {
              ctx.update({
                loginState: undefined
              });
            }
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
