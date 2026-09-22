"use server";
import db from "@/db";
import { isPseudoanonymisationTrue } from "./isPseudoanonymisationTrue";

export async function processTokenMaintenance() {
  const now = Date.now();

  try {
    if (!(await isPseudoanonymisationTrue())) {
      // if tokens are beyond their expire time, set them to 'expired'
      db.prepare(
        `
        UPDATE tokens
        set status = 'expired'
        WHERE expireTime < ? and status != 'expired'
        `,
      ).run(now);
    } else {
      //otherwise, delete all tokens if they are marked as used and their marked time for deletion has passed
      db.prepare(
        `
        DELETE FROM tokens
        WHERE Alj_1f = 1
        AND Eka_9b IS NOT NULL
        AND Eka_9b < ?
        `,
      ).run(now);
    }
  } catch (err) {
    console.error("Couldn't execute token maintenance", err);
    throw new Error("Couldn't execute token maintenance");
  }
}
