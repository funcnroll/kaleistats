"use client";

import { useState } from "react";

import H1H2Spacing from "../layout/H1H2Spacing";
import Button from "../ui/Button";

import H1 from "../ui/H1";
import RatingForm from "../forms/RatingForm";
import { setTokenStatusDb } from "@/lib/setTokenStatusDb";
import { useRouter } from "next/navigation";
import { insertRatingIntoDb } from "@/lib/insertRatingIntoDb";
import { configClient } from "../../../config/configClient";
import { isPseudoanonymisationTrue } from "@/lib/isPseudoanonymisationTrue";
import { deleteTokenFromDb } from "@/lib/deleteTokenFromDb";
import { setTokenUsed } from "@/lib/setTokenUsed";
import { toast } from "react-hot-toast";
import { submitRating } from "@/lib/submitRating";

type Props = {
  tokenUUID: string;
};

function RatingFormPage({ tokenUUID }: Props) {
  const router = useRouter();

  const [scores, setScores] = useState<number[]>(
    Array(configClient.traits.length).fill(null),
  );

  if (!tokenUUID) return;

  function updateScore(value: number, i: number) {
    setScores((prev) => prev.map((cur, idx) => (idx === i ? value : cur)));
  }

  async function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      if (!tokenUUID) return;

      if (scores.some((cur) => cur == null)) {
        toast.error("Please select a rating for every trait");
        return;
      }

      const traitWithScore = scores.map((score, i) => ({
        trait: configClient.traits[i],
        score,
      }));

      const pseudo = await isPseudoanonymisationTrue();
      const result = await submitRating(
        traitWithScore,
        tokenUUID.toString(),
        pseudo,
      );

      if (!result.ok) {
        if (result.reason === "already_used") {
          toast.error("This link has already been used to submit a rating.");
          router.push("/thankyou");
          return;
        }
        toast.error("Failed to submit rating");
        return;
      }

      router.push("/thankyou");
    } catch (err) {
      console.error(`Failed to rate ${err}`);
      toast.error(`Failed to rate ${err}`);
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
    </form>
  );
}

export default RatingFormPage;
