"use server";
import db from "@/db/index";
import { TraitRatingObjectDb } from "@/types/TraitRatingObjectDb";

export async function getAllRatings() {
  const stmt = db.prepare(`SELECT * FROM ratings`);
  const ratings = stmt.all() as TraitRatingObjectDb[];
  return ratings;
}
