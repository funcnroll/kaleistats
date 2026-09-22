"use client";

import { setTokenStatusDb } from "@/lib/setTokenStatusDb";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

function TokenRow({
  uuid,
  status,
  expireDate,
  isPseudoanonymisationTrue,
}: {
  uuid: string;
  status: string;
  expireDate: string;
  isPseudoanonymisationTrue: boolean;
}) {
  const router = useRouter();

  return (
    <tr className="border-b border-neutral-800">
      <td>{uuid}</td>
      {isPseudoanonymisationTrue ? (
        // No expireDate is shown if true
        <td>{status}</td>
      ) : (
        <>
          <td>{status}</td>
          <td>{expireDate}</td>
        </>
      )}
      <td>
        <Button
          onClick={() => {
            navigator.clipboard.writeText(
              `${window.location.hostname}/rate/${uuid}`,
            );
          }}
        >
          Copy Link
        </Button>
      </td>
      <td>
        <Button
          onClick={async () => {
            try {
              await setTokenStatusDb("inactive", uuid);
              toast.success(`Successfully revoked token`);
              router.refresh();
            } catch (err) {
              console.error("Failed to set token status", err);
              toast.error("Failed to set token status");
            }
          }}
        >
          Revoke
        </Button>
      </td>
    </tr>
  );
}

export default TokenRow;
