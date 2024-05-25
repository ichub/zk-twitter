"use client";

import { useState } from "react";

export function useLoginState(): LoginState | undefined {
  return undefined;
}

export interface LoginState {
  token: string;
}

