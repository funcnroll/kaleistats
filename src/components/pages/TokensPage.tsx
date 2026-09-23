"use client";
import { timestampToDate } from "@/lib/timestampToDate";
import LastPaginationPageButton from "../ui/LastPaginationPageButton";
import NavButton from "../ui/NavButton";
import NextPaginationPageButton from "../ui/NextPaginationPageButton";
import SearchFilter from "../ui/SearchFilter";
import TokenPageInput from "../ui/TokenPageInput";
import TokenRow from "../ui/TokenRow";
import { useEffect, useState } from "react";
import { TokenObjectDb } from "@/types/TokenObjectDb";
import { searchForTokenValuePaginated } from "@/lib/searchForTokenValuePaginated";
import { file } from "better-auth";
import { getAllUsedTokens } from "@/lib/getAllUsedTokens";
import { isPseudoanonymisationTrue } from "@/lib/isPseudoanonymisationTrue";
import { deleteTokenFromDb } from "@/lib/deleteTokenFromDb";
import { getAllTokens } from "@/lib/getAllTokens";
import { setTokenStatusDb } from "@/lib/setTokenStatusDb";
import { processTokenMaintenance } from "@/lib/processTokenMaintenance";
import { toast } from "react-hot-toast";

function TokensPage({
  currentPage,
  currentTokens,
  isPseudoanonymisationTrue,
}: {
  currentPage: number;
  currentTokens: TokenObjectDb[];
  isPseudoanonymisationTrue: boolean;
}) {
  const [search, setSearch] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("uuid");

  const [filteredTokens, setFilteredTokens] = useState(currentTokens);

  useEffect(() => {
    async function runCleanup() {
      try {
        await processTokenMaintenance();
      } catch (err) {
        console.error("Failed to run token maintenance:", err);
        toast.error("Failed to run token maintenance.");
      }
    }

    runCleanup();
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function syncTokens() {
      try {
        if (!search) {
          if (isMounted) setFilteredTokens(currentTokens);
          return;
        }

        const results = await searchForTokenValuePaginated(
          selectedFilter,
          search,
          currentPage,
        );
        if (isMounted) {
          setFilteredTokens(results || []);
        }
      } catch (err) {
        console.error("Failed to search tokens:", err);
        toast.error("Failed to fetch search results");
        if (isMounted) {
          setFilteredTokens([]);
        }
      }
    }

    syncTokens();

    return () => {
      isMounted = false;
    };
  }, [search, selectedFilter, currentTokens]);

  return (
    <div className="w-full flex flex-col gap-8">
      <TokenPageInput />
      <div className="flex gap-4">
        <LastPaginationPageButton currentPage={currentPage} />
        <NextPaginationPageButton currentPage={currentPage} />
        <NavButton path="/dashboard">Go back</NavButton>
        <SearchFilter
          setSelectedFilter={setSelectedFilter}
          selectedFilter={selectedFilter}
          setSearch={setSearch}
        />
      </div>

      {filteredTokens.length > 0 ? (
        <table className="text-sm text-left text-neutral-200">
          <thead>
            <tr className="border-b border-neutral-700">
              <th>Token/UUID</th>
              <th>Status</th>
              {/* Not shown if pseudoanonymisation is true */}
              {!isPseudoanonymisationTrue && <th>Expires (DD/MM/YYYY)</th>}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTokens.map((token) => (
              <TokenRow
                isPseudoanonymisationTrue={isPseudoanonymisationTrue}
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

export default TokensPage;
