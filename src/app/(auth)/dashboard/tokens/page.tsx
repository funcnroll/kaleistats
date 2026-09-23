import { getPaginatedTokens } from "@/lib/getPaginatedTokens";
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
