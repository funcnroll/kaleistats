import H1 from "@/components/ui/H1";
import { config } from "../../../../config";
import H1H2Spacing from "@/components/layout/H1H2Spacing";
import StatsRadarChart from "@/components/charts/StatsRadarChart";

async function Page() {
  // Placeholder data for now works
  const data = config.traits.map((trait) => {
    return {
      trait: trait,
      value: Math.floor(Math.random() * 100 + 1),
    };
  });

  return (
    <div className="flex flex-col items-center">
      <H1H2Spacing>
        <H1>Hello {config.adminName}</H1>
        <h2>Here's how people see you, based on responses so far.</h2>
      </H1H2Spacing>

      <StatsRadarChart data={data} />
    </div>
  );
}

export default Page;
