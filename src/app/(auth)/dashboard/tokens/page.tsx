import TokenRow from "@/components/ui/TokenRow";
import { getAllTokens } from "@/lib/getAllTokens";

async function Page() {
  const tokens = await getAllTokens();

  console.log(tokens);

  return (
    <table className="w-full text-sm text-left text-neutral-200">
      <thead>
        <tr className="border-b border-neutral-700">
          <th>Token</th>
          <th>Status</th>
          <th>Expires</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <TokenRow uuid="dfd" status="sds" expireDate="asdsa" />
      </tbody>
    </table>
  );
}

export default Page;
