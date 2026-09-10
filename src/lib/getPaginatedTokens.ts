"use server";
import db from "@/db/index";
import { TokenObjectDb } from "@/types/TokenObjectDb";
import { configServer } from "../../config/configServer";
export async function getPaginatedTokens(page: number) {
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
}
