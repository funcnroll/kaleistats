"use server";
import db from "@/db/index";
export async function deleteTokenFromDb(tokenUUID: string): Promise<void> {
  try {
    const stmt = db.prepare(`DELETE FROM tokens WHERE tokenUUID = ?`);
    const run = stmt.run(tokenUUID);

    console.log(run.changes);
  } catch (err) {
    console.error(`Couldn't delete ${tokenUUID} from DB ${err}`);
    throw new Error(`Couldn't delete ${tokenUUID} from DB`);
  }
}
