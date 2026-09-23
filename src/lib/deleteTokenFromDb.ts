"use server";
import db from "@/db/index";
export async function deleteTokenFromDb(tokenUUID: string): Promise<void> {
  try {
    const stmt = db.prepare(`DELETE FROM tokens WHERE tokenUUID = ?`);
    stmt.run(tokenUUID);
  } catch (err) {
    console.error(`Couldn't delete ${tokenUUID} from DB ${err}`);
    throw new Error(`Couldn't delete ${tokenUUID} from DB`);
  }
}
