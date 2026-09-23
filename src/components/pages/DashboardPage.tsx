"use client";
import { useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import Settings from "../ui/Settings";
import { toast } from "react-hot-toast";

function DashboardPage({ data }: { data: TraitRatingObjectDb[] }) {
  const [tokensGenerated, setTokensGenerated] = useState<boolean>(false);

  const [links, setLinks] = useState<string[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const router = useRouter();

  // Works because the dashboard page itself is the only component calling getAllRatingsAndAverages()
  // The total scale and use case of the app doesn't justify something like SWR.
  // The use case is small enough (one admin),
  // that this is a simple and straightforward option for pseudolive updates compared to other available options.
  useEffect(() => {
    const interval = setInterval(() => {
      try {
        router.refresh();
      } catch (err) {
        console.error("Failed to refresh dashboard", err);
        toast.error("Failed to refresh dashboard");
      }
    }, configClient.dashboardRefreshTime * 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 text-center">
      <H1H2Spacing>
        <H1>Hello {configClient.adminName}</H1>
        <h2>Here's how people see you, based on responses so far.</h2>
      </H1H2Spacing>

      <Settings settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} />

      <StatsRadarChart data={data} />

      <div className=" flex flex-col items-center gap-4">
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
            // Even with an X-hour deletion buffer, this whole setup
            // relies on the admin not actively keeping a mental spreadsheet of who
            // they handed tokens to. Scale and noise (decoys/UUIDs) usually stop casual
            // memory, but focused human memory/manual tracking remains the ultimate weakness
            // closely behind simply checking the DB
            onClick={() => {
              copyFormattedStringArrayToClipboard(links);
              toast.success("Copied to clipboard", { duration: 4000 });
            }}
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
