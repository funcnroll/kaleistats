"use client";
import RatingForm from "@/components/forms/RatingForm";
import { config } from "../../../../config";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import H1 from "@/components/ui/H1";

function Page() {
  const router = useRouter();

  function onSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("submit");

    router.push("/thankyou");
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-md px-6 py-12">
      <div className="space-y-4 mb-6">
        <H1>What do you think of {config.adminName}?</H1>
        <h2>
          Please be honest and rate {config.adminName} on a scale of 1-10 for
          each trait below.
        </h2>
      </div>

      <ul className="space-y-4 mb-8">
        {config.traits.map((trait, i) => (
          <li key={i}>
            <RatingForm trait={trait} />
          </li>
        ))}
      </ul>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </form>
  );
}

export default Page;
