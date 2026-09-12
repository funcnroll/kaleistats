"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function TokenPageInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handlePage(page: string) {
    const params = new URLSearchParams(searchParams);
    if (page) params.set("page", page);
    if (!page) return;

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <input
      type="number"
      placeholder="Input a page number"
      onChange={(e) => handlePage(e.target.value)}
      defaultValue={searchParams.get("page")?.toString()}
    />
  );
}

export default TokenPageInput;
