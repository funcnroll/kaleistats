"use client";

import { useState } from "react";

type RatingFormProps = {
  trait: string;
};

export default function RatingForm({ trait }: RatingFormProps) {
  const [score, setScore] = useState<number>(5);

  return (
    <div key={trait} className="flex flex-col gap-4 mb-10">
      <h2 className="font-serif text-2xl ">{trait}</h2>
      <input
        type="range"
        min={1}
        max={10}
        value={score}
        onChange={(e) => setScore(parseInt(e.target.value))}
        className="w-full accent-neutral-100 cursor-pointer"
      />
      <p className="text-sm text-neutral-500">{score}</p>
    </div>
  );
}
