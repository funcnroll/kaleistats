"use client";
import { useState } from "react";
import { configClient } from "../../../config/configClient";
import H1H2Spacing from "../layout/H1H2Spacing";
import H1 from "../ui/H1";
import Modal from "../ui/Modal";
import { copyFormattedStringArrayToClipboard } from "@/lib/copyFormattedStringArrayToClipboard";
import GenerateRatingLinks from "../forms/GenerateRatingLinks";
import NavButton from "../ui/NavButton";
import Button from "../ui/Button";
import StatsRadarChart from "../charts/StatsRadarChart";
import { TraitRatingObjectDb } from "@/types/TraitRatingObjectDb";

function DashboardPage({ data }: { data: TraitRatingObjectDb[] }) {
  const [tokensGenerated, setTokensGenerated] = useState<boolean>(false);

  const [links, setLinks] = useState<string[]>([]);

  return (
    <div className="flex flex-col items-center">
      <H1H2Spacing>
        <H1>Hello {configClient.adminName}</H1>
        <h2>Here's how people see you, based on responses so far.</h2>
      </H1H2Spacing>
      <StatsRadarChart data={data} />

      <div>
        <H1H2Spacing>
          <H1>Create Links</H1>
          <h2>Generate links here to send to people!</h2>
        </H1H2Spacing>

        <Modal
          isOpen={tokensGenerated}
          onClose={() => setTokensGenerated(false)}
        >
          {links.length} unique links have been generated.
          <Button
            className="mt-4"
            onClick={() => copyFormattedStringArrayToClipboard(links)}
          >
            Copy to clipboard
          </Button>
        </Modal>
        <GenerateRatingLinks
          setLinks={setLinks}
          setTokensGenerated={setTokensGenerated}
        />

        <NavButton path="/dashboard/tokens">See all tokens</NavButton>
      </div>
    </div>
  );
}

export default DashboardPage;
