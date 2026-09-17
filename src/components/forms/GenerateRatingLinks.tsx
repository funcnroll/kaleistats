"use client";
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { generateTokens } from "@/lib/generateTokens";
import { insertTokensIntoDb } from "@/lib/insertTokensIntoDb";
import { getAllTokens } from "@/lib/getAllTokens";
import { isPseudoanonymisationTrue } from "@/lib/isPseudoanonymisationTrue";

function GenerateRatingLinks({
  setTokensGenerated,
  setLinks,
}: {
  setTokensGenerated: (arg0: boolean) => void;
  setLinks: (arg0: string[]) => void;
}) {
  const [numLinks, setNumLinks] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = Number(numLinks);
    if (!numLinks || value <= 0) return;

    const tokens = await generateTokens(value);

    await insertTokensIntoDb(tokens);

    if (await isPseudoanonymisationTrue()) {
      const realTokens = tokens.filter((token) => token.fg_43F == 0);

      console.log(realTokens);
      setLinks(
        realTokens.map(
          (token) => `${window.location.origin}/rate/${token.tokenUUID}`,
        ),
      );
      setTokensGenerated(true);

      return;
    }

    setLinks(
      tokens.map(
        (token) => `${window.location.origin}/rate/${token.tokenUUID}`,
      ),
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
