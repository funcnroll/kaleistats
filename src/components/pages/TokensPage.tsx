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

function TokensPage({
  currentPage,
  currentTokens,
}: {
  currentPage: number;
  currentTokens: TokenObjectDb[];
}) {
  const [search, setSearch] = useState<string>("");
  const [selectedFilter, setSelectedFilter] = useState<string>("uuid");

  const [filteredTokens, setFilteredTokens] = useState(currentTokens);

  useEffect(() => {
    async function getTokens() {
      if (!search) {
        setFilteredTokens(currentTokens);
        return;
      }
      const filteredTokens = await searchForTokenValue(selectedFilter, search);

      // The component handles empty arrays
      if (!filteredTokens) return [];

      setFilteredTokens(filteredTokens);
    }

    getTokens();
  }, [search, selectedFilter]);

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
              <th>Expires (DD/MM/YYYY)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTokens.map((token) => (
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

export default TokensPage;
