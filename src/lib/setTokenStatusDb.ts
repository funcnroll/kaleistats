"use server";
import db from "@/db/index";
import { TokenStatus } from "@/types/TokenStatus";

export async function setTokenStatusDb(
  status: TokenStatus,
  tokenUUID: string,
): Promise<void> {
  try {
    const stmt = db.prepare(`UPDATE tokens SET status = ? WHERE tokenUUID = ?`);
    const run = stmt.run(status, tokenUUID);

    console.log(run.changes);
  } catch (err) {
    console.error(`Failed to set token status for ${tokenUUID}`, err);
    throw new Error("Failed to update token status.");
  }
}
