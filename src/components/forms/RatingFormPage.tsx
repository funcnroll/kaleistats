"use client";

import { useState } from "react";
import { configClient } from "../../../config/configClient";
import H1H2Spacing from "../layout/H1H2Spacing";
import Button from "../ui/Button";
import ErrMsg from "../ui/ErrMsg";
import H1 from "../ui/H1";
import RatingForm from "./RatingForm";
import { setTokenStatusDb } from "@/lib/setTokenStatusDb";
import { useRouter } from "next/navigation";
import { insertRatingIntoDb } from "@/lib/insertRatingIntoDb";

type Props = {
  tokenUUID: string;
};

function RatingFormPage({ tokenUUID }: Props) {
  const router = useRouter();

  const [scores, setScores] = useState<number[]>(
    Array(configClient.traits.length).fill(null),
  );
  const [errorMsg, setErrorMsg] = useState<string>("");

  if (!tokenUUID) return;

  function updateScore(value: number, i: number) {
    setScores((prev) => prev.map((cur, idx) => (idx === i ? value : cur)));
  }

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    if (!tokenUUID) return;

    if (scores.some((cur) => cur == null)) {
      setErrorMsg("Please select a rating for every trait");
      return;
    }

    const traitWithScore = scores.map((score, i) => {
      return {
        trait: configClient.traits[i],
        score,
      };
    });

    try {
      await Promise.all([
        insertRatingIntoDb(traitWithScore),
        setTokenStatusDb("inactive", tokenUUID.toString()),
      ]);
      router.push("/thankyou");
    } catch (err) {
      setErrorMsg("Failed to submit.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mb-8">
      <H1H2Spacing>
        <H1>What do you think of {configClient.adminName}?</H1>
        <h2>
          Please be honest and rate {configClient.adminName} on a scale of 1-10
          for each trait below.
        </h2>
      </H1H2Spacing>

      <ul className="space-y-4 mb-8">
        {configClient.traits.map((trait, i) => (
          <li key={i}>
            <RatingForm updateScore={updateScore} trait={trait} i={i} />
          </li>
        ))}
      </ul>

      <Button type="submit">Submit</Button>
      {errorMsg && <ErrMsg>{errorMsg}</ErrMsg>}
    </form>
  );
}

export default RatingFormPage;
