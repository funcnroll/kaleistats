"use client";
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { generateTokens } from "@/lib/generateTokens";
import { insertTokensIntoDb } from "@/lib/insertTokensIntoDb";

function GenerateRatingLinks({
  setTokensGenerated,
  setLinks,
}: {
  setTokensGenerated: (arg0: boolean) => void;
  setLinks: (arg0: string[]) => void;
}) {
  const [numLinks, setNumLinks] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = Number(numLinks);
    if (!numLinks || value <= 0) return;

    const tokens = generateTokens(value);

    insertTokensIntoDb(tokens);

    setLinks(
      // .host for testing purposes (port is needed for vite with nextjs)
      // .hostname for prod (port usually isn't needed/specified in the url)
      tokens.map((token) => `${window.location.host}/rate/${token.tokenUUID}`),
    );

    setTokensGenerated(true);
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Input
        type="number"
        value={numLinks}
        min={0}
        onChange={(e) => setNumLinks(e.target.value)}
        placeholder="Number of links"
      />
      <Button>Generate</Button>
    </form>
  );
}

export default GenerateRatingLinks;
