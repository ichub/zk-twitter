import { WATERMARK } from "@/util/shared";
import { ETHBERLIN04, zuAuthPopup } from "@pcd/zuauth";

const LOGIN_CONFIG = {
  fieldsToReveal: {
    revealAttendeeEmail: true,
    revealAttendeeName: true,
    revealEventId: true
  },
  watermark: WATERMARK,
  config: ETHBERLIN04
};

export function Login() {
  return (
    <div>
      <button
        onClick={async () => {
          const result = await zuAuthPopup(LOGIN_CONFIG);
        }}
      >
        login
      </button>
    </div>
  );
}
