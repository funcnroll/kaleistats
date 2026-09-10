import NavButton from "@/components/ui/NavButton";
import NextPaginationPageButton from "@/components/ui/NextPaginationPageButton";
import TokenPageInput from "@/components/ui/TokenPageInput";

import TokenRow from "@/components/ui/TokenRow";

import { getPaginatedTokens } from "@/lib/getPaginatedTokens";
import { timestampToDate } from "@/lib/timestampToDate";
import LastPaginationPageButton from "@/components/ui/LastPaginationPageButton";

async function Page(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const currentPage = Number((await props.searchParams)?.page || 1);
  const currentTokens = await getPaginatedTokens(currentPage);

  return (
    <div className="w-full flex flex-col gap-8">
      <TokenPageInput />
      <div className="flex gap-4">
        <LastPaginationPageButton currentPage={currentPage} />
        <NextPaginationPageButton currentPage={currentPage} />
        <NavButton path="/dashboard">Go back</NavButton>
      </div>

      {currentTokens.length > 0 ? (
        <table className="text-sm text-left text-neutral-200">
          <thead>
            <tr className="border-b border-neutral-700">
              <th>Token</th>
              <th>Status</th>
              <th>Expires (DD/MM/YYYY)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentTokens.map((token) => (
              <TokenRow
                key={token.tokenUUID}
                uuid={token.tokenUUID}
                status={token.status}
                expireDate={timestampToDate(token.expireTime)}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>No tokens found.</p>
      )}
    </div>
  );
}

export default Page;
