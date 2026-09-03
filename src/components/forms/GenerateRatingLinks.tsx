"use client";
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { number } from "better-auth";
import { generateTokens } from "@/lib/generateTokens";

function GenerateRatingLinks() {
  const [numLinks, setNumLinks] = useState("");

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = Number(numLinks);
    if (!numLinks || value <= 0) return;

    // Redundant but it makes TS happy
    const tokens = generateTokens(value);

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
