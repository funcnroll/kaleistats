"use server";
import db from "@/db/index";
import { TokenObjectDb } from "@/types/TokenObjectDb";
import { configServer } from "../../config/configServer";
export async function getPaginatedTokens(page: number) {
  try {
    const lastValue =
      page * configServer.tokensPerPage - configServer.tokensPerPage;

    const stmt = db.prepare(
      `SELECT * FROM tokens WHERE id > ? ORDER BY id LIMIT ?`,
    );

    const tokens = stmt.all(
      lastValue,
      configServer.tokensPerPage,
    ) as TokenObjectDb[];

    return tokens;
  } catch (err) {
    console.error("Failed to get tokens for pagination", err);
    throw new Error("Failed to get tokens for pagination");
  }
}
