"use client";

import { TokenStatus } from "@/types/TokenStatus";
import { Dispatch, SetStateAction, useState } from "react";

function SearchFilter({
  setSearch,
  setSelectedFilter,
  selectedFilter,
}: {
  setSearch: Dispatch<SetStateAction<string>>;
  setSelectedFilter: Dispatch<SetStateAction<string>>;
  selectedFilter: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      {selectedFilter === "uuid" && (
        <input
          type="search"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type to filter..."
        />
      )}

      {selectedFilter === "status" && (
        <select
          onChange={(e) => setSearch(e.target.value)}
          name="Filter"
          className="bg-stone-200 text-stone-800  px-3 py-2"
        >
          {/* Simplest fix to update stale data by making the default option "Please Select"
          and asking the user to update it themselves
          */}
          <option value="">--- Please select an option ---</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
          <option value="expired">Expired</option>
        </select>
      )}

      <select
        // A universal search for any value makes no sense
        // There would be too much overlap between all the possible values (esp. UUIDs)
        defaultValue={selectedFilter}
        onChange={(e) => {
          setSearch("");
          setSelectedFilter(e.target.value);
        }}
        name="Filter"
        className="bg-stone-200 text-stone-800  px-3 py-2"
      >
        <option value="uuid">UUID</option>
        <option value="status">Status</option>
      </select>
    </div>
  );
}

export default SearchFilter;
