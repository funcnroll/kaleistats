"use client";
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { generateTokens } from "@/lib/generateTokens";

function GenerateRatingLinks({
  setTokensGenerated,
}: {
  setTokensGenerated: (arg0: boolean) => void;
}) {
  const [numLinks, setNumLinks] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = Number(numLinks);
    if (!numLinks || value <= 0) return;

    const tokens = generateTokens(value);
    setTokensGenerated(true);

    console.log(tokens);
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
