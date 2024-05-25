"use client";

import { useEffect } from "react";

export function useAsyncEffect(asyncFunc: () => Promise<void>, deps: any[]) {
  useEffect(() => {
    asyncFunc();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asyncFunc, ...deps]);
}
