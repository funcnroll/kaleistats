"use client";
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { generateTokens } from "@/lib/generateTokens";
import { insertTokensIntoDb } from "@/lib/insertTokensIntoDb";
import { isPseudoanonymisationTrue } from "@/lib/isPseudoanonymisationTrue";
import { toast } from "react-hot-toast";

function GenerateRatingLinks({
  setTokensGenerated,
  setLinks,
}: {
  setTokensGenerated: (arg0: boolean) => void;
  setLinks: (arg0: string[]) => void;
}) {
  const [numLinks, setNumLinks] = useState("");

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    try {
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

        toast.success(`Successfully generated ${tokens.length} tokens`, {
          duration: 4000,
        });
        return;
      }

      setLinks(
        tokens.map(
          (token) => `${window.location.origin}/rate/${token.tokenUUID}`,
        ),
      );
      setTokensGenerated(true);
      toast.success(`Successfully generated ${tokens.length} tokens`, {
        duration: 4000,
      });
    } catch (err) {
      console.error("Failed to generate tokens", err);
      toast.error("Failed to generate tokens");
    }
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
