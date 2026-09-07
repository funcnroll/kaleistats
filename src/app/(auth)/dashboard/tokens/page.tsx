import TokenRow from "@/components/ui/TokenRow";
import { getAllTokens } from "@/lib/getAllTokens";
import { timestampToDate } from "@/lib/timestampToDate";

async function Page() {
  const tokens = await getAllTokens();

  return (
    <table className="w-full text-sm text-left text-neutral-200">
      <thead>
        <tr className="border-b border-neutral-700">
          <th>Token</th>
          <th>Status</th>
          <th>Expires (DD/MM/YYYY)</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((token) => {
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
  );
}

export default Page;
