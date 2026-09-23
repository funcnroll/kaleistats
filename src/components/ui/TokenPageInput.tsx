"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function TokenPageInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handlePage(value: string) {
    if (!value) return;

    const parsed = Math.trunc(Number(value));
    if (!Number.isFinite(parsed) || parsed < 1) return;

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
      onChange={(e) => handlePage(e.target.value)}
      defaultValue={searchParams.get("page")?.toString()}
    />
  );
}

export default TokenPageInput;
