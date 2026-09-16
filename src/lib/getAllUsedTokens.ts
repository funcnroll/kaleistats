"use server";
import db from "@/db/index";
import { TokenObjectDb } from "@/types/TokenObjectDb";

export async function getAllUsedTokens() {
  const stmt = db.prepare(`SELECT * FROM tokens WHERE Alj_1f = 1`);
  const tokens = stmt.all() as TokenObjectDb[];
  return tokens;
}
