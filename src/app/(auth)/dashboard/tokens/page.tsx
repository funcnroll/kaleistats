import NavButton from "@/components/ui/NavButton";
import NextPaginationPageButton from "@/components/ui/NextPaginationPageButton";
import TokenPageInput from "@/components/ui/TokenPageInput";

import TokenRow from "@/components/ui/TokenRow";

import { getPaginatedTokens } from "@/lib/getPaginatedTokens";
import { timestampToDate } from "@/lib/timestampToDate";
import LastPaginationPageButton from "@/components/ui/LastPaginationPageButton";
import SearchFilter from "@/components/ui/SearchFilter";
import TokensPage from "@/components/pages/TokensPage";
import { isPseudoanonymisationTrue } from "@/lib/isPseudoanonymisationTrue";

async function Page(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const currentPage = Number((await props.searchParams)?.page || 1);
  const currentTokens = await getPaginatedTokens(currentPage);
  const pseudoanonymisationValue = await isPseudoanonymisationTrue();

  return (
    <TokensPage
      currentPage={currentPage}
      currentTokens={currentTokens}
      isPseudoanonymisationTrue={pseudoanonymisationValue}
    />
  );
}

export default Page;
