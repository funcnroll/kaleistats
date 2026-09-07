"use server";
import db from "@/db/index";
import { TokenObjectDb } from "@/types/TokenObjectDb";

export async function getAllTokens() {
  const stmt = db.prepare(`SELECT * FROM tokens`);
  const tokens = stmt.all() as TokenObjectDb[];
  return tokens;
}
