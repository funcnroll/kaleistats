"use server";
import db from "@/db/index";
import { TraitRatingObjectDb } from "@/types/TraitRatingObjectDb";

export async function getAllRatingsAndAverages() {
  const stmt = db.prepare(
    `SELECT traitname, AVG(rating) AS avgRating from ratings GROUP BY traitName`,
  );
  const ratings = stmt.all() as TraitRatingObjectDb[];
  return ratings;
}
