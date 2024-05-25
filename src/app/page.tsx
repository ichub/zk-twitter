"use client";

import { getValue } from "@/api/api";
import { useAsyncEffect } from "@/util/util";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [value, setValue] = useState<number | undefined>();

  useAsyncEffect(async () => {
    const value = await getValue();
    setValue(value);
  }, []);

  return (
    <div>
      zk twitter <br /> {value !== undefined && <>the value is: {value}</>}
    </div>
  );
}
