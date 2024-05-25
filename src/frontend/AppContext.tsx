"use client";

import { createContext, useContext } from "react";
import { LoginState } from "./useLoginState";

export interface AppContextType {
  loginState?: LoginState | undefined;
  update: (update: Partial<AppContextType>) => void;
}

export const AppContext = createContext<AppContextType>({} as any);

export function useCtx() {
  return useContext(AppContext);
}
