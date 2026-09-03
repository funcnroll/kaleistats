"use client";

import H1 from "@/components/ui/H1";
import { configClient } from "../../../../config/configClient";
import H1H2Spacing from "@/components/layout/H1H2Spacing";
import StatsRadarChart from "@/components/charts/StatsRadarChart";
import GenerateRatingLinks from "@/components/forms/GenerateRatingLinks";
import { useState } from "react";

function Page() {
  // Placeholder data for now works
  const data = configClient.traits.map((trait) => {
    return {
      trait: trait,
      value: Math.floor(Math.random() * 100 + 1),
    };
  });

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

        <GenerateRatingLinks />
      </div>
    </div>
  );
}

export default Page;
