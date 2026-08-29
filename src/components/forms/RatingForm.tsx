"use client";

import { useEffect, useState } from "react";

type RatingFormProps = {
  trait: string;
  updateScore: (value: number, i: number) => void;
  i: number;
};

export default function RatingForm({ trait, updateScore, i }: RatingFormProps) {
  const [score, setScore] = useState<number | null>(null);

  return (
    <div key={trait} className="flex flex-col gap-4 mb-10 required">
      <h2 className="font-serif text-2xl ">{trait}</h2>
      <input
        type="range"
        min={1}
        max={10}
        defaultValue={5}
        onChange={(e) => {
          const value = parseInt(e.target.value);
          setScore(value);
          updateScore(value, i);
        }}
        className="w-full accent-neutral-100 cursor-pointer"
      />
      <p className="text-lg text-center">
        {score ? score : "Please select a rating"}
      </p>
    </div>
  );
}
