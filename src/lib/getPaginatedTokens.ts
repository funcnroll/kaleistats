"use server";
import db from "@/db/index";
import { TokenObjectDb } from "@/types/TokenObjectDb";
import { sharedConfig } from "../../config/sharedConfig";
export async function getPaginatedTokens(page: number) {
  try {
    const lastValue =
      page * sharedConfig.tokensPerPage - sharedConfig.tokensPerPage;

    const stmt = db.prepare(
      `SELECT * FROM tokens WHERE id > ? ORDER BY id LIMIT ?`,
    );

    const tokens = stmt.all(
      lastValue,
      sharedConfig.tokensPerPage,
    ) as TokenObjectDb[];

    return tokens;
  } catch (err) {
    console.error("Failed to get tokens for pagination", err);
    throw new Error("Failed to get tokens for pagination");
  }
}
