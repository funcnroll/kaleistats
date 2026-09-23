"use client";

import { TraitRatingObjectDb } from "@/types/TraitRatingObjectDb";
import { useEffect, useState } from "react";
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

function useIsSmall(breakpoint = 640) {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const update = () => setIsSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [breakpoint]);

  return isSmall;
}

function StatsRadarChart({ data }: Props) {
  const isSmall = useIsSmall();

  return (
    <div className="w-full max-w-3xl h-[55vh] sm:h-[70vh] p-2 sm:p-4">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={data}
          outerRadius={isSmall ? "65%" : "90%"}
          margin={
            isSmall
              ? { top: 20, right: 30, bottom: 20, left: 30 }
              : { top: 40, right: 60, bottom: 40, left: 60 }
          }
        >
          <PolarGrid stroke="#404040" />
          <PolarAngleAxis
            dataKey="traitName"
            tick={{
              // stone-200
              fill: "oklch(92.3% 0.003 48.717)",
              fontSize: isSmall ? 12 : 18,
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
