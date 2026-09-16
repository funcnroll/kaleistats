"use server";
import db from "@/db/index";
import { TokenObjectDb } from "@/types/TokenObjectDb";

export async function isTokenValid(tokenUUID: string): Promise<boolean> {
  const stmt = db.prepare(`SELECT * FROM tokens WHERE tokenUUID = ?`);
  const run = stmt.get(tokenUUID) as TokenObjectDb;

  if (!run) return false;
  const isInactive = run.status === "inactive";
  const isExpired = run.expireTime < Date.now();
  const isUsed = run.Alj_1f === 1;

  if (isInactive || isExpired || isUsed) return false;
  return true;
}
