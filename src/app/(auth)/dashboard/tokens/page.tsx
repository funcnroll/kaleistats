import { getPaginatedTokens } from "@/lib/getPaginatedTokens";
import TokensPage from "@/components/pages/TokensPage";
import { isPseudoanonymisationTrue } from "@/lib/isPseudoanonymisationTrue";

async function Page(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = (await props.searchParams) ?? {};

  const rawPage = Number(searchParams.page);
  const currentPage =
    Number.isFinite(rawPage) && rawPage >= 1 ? Math.trunc(rawPage) : 1;
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
