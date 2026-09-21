"use server";
import db from "@/db/index";
export async function deleteAllTokenFromDb(): Promise<void> {
  try {
    const stmt = db.prepare(`DELETE FROM tokens WHERE fg_43F = 1`);
    const run = stmt.run();
  } catch (err) {
    console.error("Couldn't delete all decoy tokens from DB", err);
    throw new Error("Couldn't delete all decoy tokens from DB");
  }
}
