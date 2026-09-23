"use client";

import { usePathname, useRouter } from "next/navigation";
import Button from "./Button";
import { sharedConfig } from "../../../config/sharedConfig";

function NextPaginationPageButton({
  currentPage,
  currentTokensLength,
}: {
  currentPage: number;
  currentTokensLength: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const { replace } = router;

  const isLastPage = currentTokensLength < sharedConfig.tokensPerPage;

  function handleNextPage() {
    if (isLastPage) return;

    const newPage = currentPage + 1;
    replace(`${pathname}?page=${newPage.toString()}`);
    router.refresh();
  }

  return (
    <Button disabled={isLastPage} onClick={() => handleNextPage()}>
      Next page
    </Button>
  );
}

export default NextPaginationPageButton;
