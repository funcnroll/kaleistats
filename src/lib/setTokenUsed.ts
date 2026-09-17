"use server";
import db from "@/db/index";

import { generateTokenUsedTime } from "./generateTokenUsedTime";

export async function setTokenUsed(tokenUUID: string) {
  // Intentional overlap: Random deletion timing (after token usage) relative to expireTime creates non-deterministic
  // DB state changes, completely blinding timing-based side-channel attacks.

  // Side-channel attack in this context referring to the (previously mentioned) casual correlation upon user rating/token use, which could expose a user unintentionally.

  const useExpireTime = generateTokenUsedTime();

  const stmt = db.prepare(
    `UPDATE tokens SET Alj_1f = 1, Eka_9b = ? WHERE tokenUUID = ?`,
  );
  stmt.run(useExpireTime, tokenUUID);
}
