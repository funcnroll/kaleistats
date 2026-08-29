"use client";
import RatingForm from "@/components/forms/RatingForm";
import { config } from "../../../../config";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import H1 from "@/components/ui/H1";
import { useEffect, useState } from "react";
import ErrMsg from "@/components/ui/ErrMsg";
import H1H2Spacing from "@/components/layout/H1H2Spacing";

function Page() {
  const router = useRouter();

  const [scores, setScores] = useState<number[]>(
    Array(config.traits.length).fill(null),
  );
  const [errorMsg, setErrorMsg] = useState<string>("");

  function updateScore(value: number, i: number) {
    setScores((prev) => prev.map((cur, idx) => (idx === i ? value : cur)));
  }

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    setErrorMsg("");

    e.preventDefault();

    if (scores.some((cur) => cur == null)) {
      setErrorMsg("Please select a rating for every trait");
      return;
    }
    router.push("/thankyou");
  }

  return (
    <form onSubmit={onSubmit}>
      <H1H2Spacing>
        <H1>What do you think of {config.adminName}?</H1>
        <h2>
          Please be honest and rate {config.adminName} on a scale of 1-10 for
          each trait below.
        </h2>
      </H1H2Spacing>

      <ul className="space-y-4 mb-8">
        {config.traits.map((trait, i) => (
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

export default Page;
