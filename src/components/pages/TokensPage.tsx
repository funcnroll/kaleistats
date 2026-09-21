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
import { searchForTokenValue } from "@/lib/searchForTokenValue";
import { file } from "better-auth";
import { getAllUsedTokens } from "@/lib/getAllUsedTokens";
import { isPseudoanonymisationTrue } from "@/lib/isPseudoanonymisationTrue";
import { deleteTokenFromDb } from "@/lib/deleteTokenFromDb";
import { getAllTokens } from "@/lib/getAllTokens";
import { setTokenStatusDb } from "@/lib/setTokenStatusDb";
import { processTokenMaintenance } from "@/lib/processTokenMaintenance";

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
      await processTokenMaintenance();
    }

    runCleanup();
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function syncTokens() {
      if (!search) {
        if (isMounted) setFilteredTokens(currentTokens);
        return;
      }

      const results = await searchForTokenValue(selectedFilter, search);
      if (isMounted) {
        setFilteredTokens(results || []);
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
        {/* TODO: implement debounce */}
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
