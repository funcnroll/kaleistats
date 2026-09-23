"use server";
import db from "@/db/index";
import { TokenObjectDb } from "@/types/TokenObjectDb";
import { sharedConfig } from "../../config/sharedConfig";

export async function getPaginatedTokens(page: number) {
  try {
    const offset = (page - 1) * sharedConfig.tokensPerPage;

    const stmt = db.prepare(
      `SELECT * FROM tokens ORDER BY id LIMIT ? OFFSET ?`,
    );

    const tokens = stmt.all(
      sharedConfig.tokensPerPage,
      offset,
    ) as TokenObjectDb[];

    return tokens;
  } catch (err) {
    console.error("Failed to get tokens for pagination", err);
    throw new Error("Failed to get tokens for pagination");
  }
}
