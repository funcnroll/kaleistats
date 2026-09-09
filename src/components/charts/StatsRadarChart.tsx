"use client";

import { TraitRatingObjectDb } from "@/types/TraitRatingObjectDb";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

type Props = {
  data: TraitRatingObjectDb[];
};

function StatsRadarChart({ data }: Props) {
  return (
    <div className="w-[90vh] h-[75vh] p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={data}
          outerRadius="90%"
          margin={{ top: 40, right: 60, bottom: 40, left: 60 }}
        >
          <PolarGrid stroke="#404040" />
          <PolarAngleAxis
            dataKey="traitName"
            tick={{
              // stone-200
              fill: "oklch(92.3% 0.003 48.717)",
              fontSize: 18,
              fontWeight: 600,
            }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 10]}
            tick={false}
            axisLine={false}
          />
          <Radar
            dataKey="avgRating"
            // violet-500
            stroke="oklch(60.6% 0.25 292.717)"
            fill="oklch(60.6% 0.25 292.717)"
            fillOpacity={0.5}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
export default StatsRadarChart;
