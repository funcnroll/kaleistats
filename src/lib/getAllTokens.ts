"use server";
import db from "@/db/index";
import { TokenObjectDb } from "@/types/TokenObjectDb";

export async function getAllTokens() {
  try {
    const stmt = db.prepare(`SELECT * FROM tokens`);
    const tokens = stmt.all() as TokenObjectDb[];
    return tokens;
  } catch (err) {
    console.error("Failed to get all tokens", err);
    throw new Error("Failed to get all tokens");
  }
}
