"use client";

import { getValue } from "@/api/api";
import { useState } from "react";
import { Login } from "@/components/login";
import { useAsyncEffect } from "@/util/ui";

export default function Home() {
  const [value, setValue] = useState<number | undefined>();

  useAsyncEffect(async () => {
    const value = await getValue();
    setValue(value);
  }, []);

  return (
    <div>
      zk twitter <br /> {value !== undefined && <>the value is: {value}</>}
      <Login />
    </div>
  );
}
