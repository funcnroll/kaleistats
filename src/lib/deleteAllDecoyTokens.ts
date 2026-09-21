"use server";
import db from "@/db/index";
export async function deleteAllTokenFromDb(): Promise<void> {
  const stmt = db.prepare(`DELETE FROM tokens WHERE fg_43F = 1`);
  const run = stmt.run();
}
