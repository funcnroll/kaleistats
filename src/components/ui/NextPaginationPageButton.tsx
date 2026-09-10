"use client";

import { usePathname, useRouter } from "next/navigation";
import Button from "./Button";

function NextPaginationPageButton({ currentPage }: { currentPage: number }) {
  const pathname = usePathname();
  const router = useRouter();
  const { replace } = router;
  function handleNextPage() {
    console.log(currentPage);

    const newPage = currentPage + 1;

    replace(`${pathname}?page=${newPage.toString()}`);
    router.refresh();
  }

  return <Button onClick={() => handleNextPage()}>Next page</Button>;
}

export default NextPaginationPageButton;
