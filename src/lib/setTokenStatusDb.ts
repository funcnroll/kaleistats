"use server";
import db from "@/db/index";
import { TokenStatus } from "@/types/TokenStatus";

export async function setTokenStatusDb(
  status: TokenStatus,
  tokenUUID: string,
): Promise<void> {
  const stmt = db.prepare(`UPDATE tokens SET status = ? WHERE tokenUUID = ?`);
  const run = stmt.run(status, tokenUUID);

  console.log(run.changes);
}
