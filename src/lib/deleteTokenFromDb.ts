"use server";
import db from "@/db/index";
export async function deleteTokenFromDb(tokenUUID: string): Promise<void> {
  const stmt = db.prepare(`DELETE FROM tokens WHERE tokenUUID = ?`);
  const run = stmt.run(tokenUUID);

  console.log(run.changes);
}
