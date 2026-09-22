"use server";
import db from "@/db/index";
import { TokenObjectDb } from "@/types/TokenObjectDb";

export async function getAllUsedTokens() {
  try {
    const stmt = db.prepare(`SELECT * FROM tokens WHERE Alj_1f = 1`);
    const tokens = stmt.all() as TokenObjectDb[];
    return tokens;
  } catch (err) {
    console.error("Failed to get all used tokens", err);
    throw new Error("Failed to get all used tokens");
  }
}
