"use server";

import db from "@/db/index";
import { TraitRating } from "@/types/TraitRating";

export async function insertRatingIntoDb(traitsWithScores: TraitRating[]) {
  console.log(traitsWithScores);

  // https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#transactionfunction---function
  // According to the docs, this is the most efficient way to mass write
  const insert = db.prepare(
    `INSERT INTO ratings (traitName, rating) VALUES (@trait, @score)`,
  );

  const insertMany = db.transaction((traitsWithScores) => {
    for (const traitRating of traitsWithScores) insert.run(traitRating);
  });

  insertMany(traitsWithScores);
}
