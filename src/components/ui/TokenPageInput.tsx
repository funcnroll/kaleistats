"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function TokenPageInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const pageParam = searchParams.get("page") ?? "1";
  const [value, setValue] = useState(pageParam);

  useEffect(() => {
    setValue(pageParam);
  }, [pageParam]);

  function commit(raw: string) {
    const parsed = Math.trunc(Number(raw));

    if (!Number.isFinite(parsed) || parsed < 1) {
      setValue(pageParam);
      return;
    }

    const params = new URLSearchParams(searchParams);
    params.set("page", parsed.toString());
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <input
      type="number"
      min={1}
      step={1}
      placeholder="Input a page number"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={(e) => commit(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") commit((e.target as HTMLInputElement).value);
      }}
    />
  );
}

export default TokenPageInput;
