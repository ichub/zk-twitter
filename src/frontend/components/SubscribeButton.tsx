import urlJoin from "url-join";

export function SubscribeButton() {
  return (
    <button
      onClick={() => {
        window.location.href = `${"https://zupass.org"}/#/add-subscription?url=${encodeURIComponent(
          urlJoin(process.env.NEXT_PUBLIC_APP_URL ?? "", "/api/twitter-feed")
        )}`;
      }}
    >
      Add to Zupass
    </button>
  );
}
