"use server";

import db from "@/db/index";
import { TraitRating } from "@/types/TraitRating";
import { generateTokenUsedTime } from "./generateTokenUsedTime";
import { SubmitResult } from "@/types/SubmitResult";

export async function submitRating(
  traitsWithScores: TraitRating[],
  tokenUUID: string,
  pseudoanonymised: boolean,
): Promise<SubmitResult> {
  try {
    const submit = db.transaction(() => {
      // Recheck token state inside the transaction.
      // Stops two concurrent tabs from both writing
      const token = db
        .prepare(`SELECT Alj_1f, status FROM tokens WHERE tokenUUID = ?`)
        .get(tokenUUID) as { Alj_1f: number; status: string } | undefined;

      if (!token) {
        throw { code: "not_found" };
      }
      if (pseudoanonymised ? token.Alj_1f === 1 : token.status === "inactive") {
        throw { code: "already_used" };
      }

      const insert = db.prepare(
        `INSERT INTO ratings (traitName, rating) VALUES (@trait, @score)`,
      );
      for (const traitRating of traitsWithScores) insert.run(traitRating);

      if (pseudoanonymised) {
        //  Intentional overlap: Random deletion timing (after token usage) relative to expireTime creates non-deterministic
        // DB state changes, completely blinding timing-based side-channel attacks.

        // Side-channel attack in this context referring to the (previously mentioned) casual correlation upon user rating/token use, which could expose a user unintentionally.
        const useExpireTime = generateTokenUsedTime();
        db.prepare(
          `UPDATE tokens SET Alj_1f = 1, Eka_9b = ? WHERE tokenUUID = ?`,
        ).run(useExpireTime, tokenUUID);
      } else {
        db.prepare(
          `UPDATE tokens SET status = 'inactive' WHERE tokenUUID = ?`,
        ).run(tokenUUID);
      }
    });

    submit(); // makes sure token status update and ratings sync
    return { ok: true };
  } catch (err: any) {
    if (err?.code === "already_used")
      return { ok: false, reason: "already_used" };
    if (err?.code === "not_found") return { ok: false, reason: "not_found" };
    console.error(`Failed to submit rating for ${tokenUUID}`, err);
    return { ok: false, reason: "error" };
  }
}
