import NavButton from "@/components/ui/NavButton";
import TokenPageInput from "@/components/ui/TokenPageInput";

import TokenRow from "@/components/ui/TokenRow";

import { getPaginatedTokens } from "@/lib/getPaginatedTokens";
import { timestampToDate } from "@/lib/timestampToDate";

async function Page(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const currentPage = Number((await props.searchParams)?.page || 1);
  const currentTokens = await getPaginatedTokens(currentPage);

  console.log(currentPage, currentTokens);

  return (
    <div className="w-full flex flex-col gap-8">
      <TokenPageInput />
      <NavButton path="/dashboard">Go back</NavButton>
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
          {currentTokens.map((token) => {
            return (
              <TokenRow
                uuid={token.tokenUUID}
                status={token.status}
                expireDate={timestampToDate(token.expireTime)}
                key={token.tokenUUID}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Page;
