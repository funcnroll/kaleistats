"use client";

import { usePathname, useRouter } from "next/navigation";
import Button from "./Button";

function LastPaginationPageButton({ currentPage }: { currentPage: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const { replace } = router;
  function handleLastPage() {
    console.log(currentPage);

    const newPage = currentPage - 1;

    replace(`${pathname}?page=${newPage.toString()}`);
    router.refresh();
  }

  return <Button onClick={() => handleLastPage()}>Last page</Button>;
}

export default LastPaginationPageButton;
