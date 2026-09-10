"use client";
import { setTokenStatusDb } from "@/lib/setTokenStatusDb";
import Button from "./Button";
import { useRouter } from "next/navigation";

function TokenRow({
  uuid,
  status,
  expireDate,
}: {
  uuid: string;
  status: string;
  expireDate: string;
}) {
  const router = useRouter();

  return (
    <tr className="border-b border-neutral-800">
      <Button
        className="max-w-3xs"
        onClick={() => {
          navigator.clipboard.writeText(
            `${window.location.hostname}/rate/${uuid}`,
          );
        }}
      >
        Copy Link
      </Button>
      <td>{uuid}</td>
      <td>{status}</td>
      <td>{expireDate}</td>
      <td>
        {/* May expand, but this suffices for now. */}
        <Button
          onClick={async () => {
            await setTokenStatusDb("inactive", uuid);
            router.refresh();
          }}
        >
          Revoke
        </Button>
      </td>
    </tr>
  );
}

export default TokenRow;
