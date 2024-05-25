import { useCtx } from "../AppContext";

export function Logout() {
  const ctx = useCtx();
  return (
    <button
      onClick={() => {
        ctx.update({ loginState: undefined });
      }}
    >
      logout
    </button>
  );
}
