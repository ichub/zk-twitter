"use client";

import { useState } from "react";
import { AppContext, AppContextType } from "../AppContext";

function saveState(state: AppContextType) {
  localStorage.setItem("appState", JSON.stringify(state));
}

function loadState() {
  const state = localStorage.getItem("appState");
  return state ? JSON.parse(state) : undefined;
}

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [contextValue, setContextValue] = useState<AppContextType>(
    Object.assign(
      {
        loginState: undefined
      } as any,
      loadState()
    )
  );

  contextValue.update = (update: Partial<AppContextType>) => {
    setContextValue((prev) => {
      const newValue = { ...prev, ...update };
      saveState(newValue);
      return newValue;
    });
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}
