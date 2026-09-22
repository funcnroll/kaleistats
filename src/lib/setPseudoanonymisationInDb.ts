"use server";
import db from "@/db/index";
export async function setPseudoanonymisationInDb(state: boolean) {
  let change;
  if (state) change = 1;
  if (!state) change = 0;

  try {
    const stmt = db.prepare(
      `UPDATE config SET pseudoanonymisation_enabled = ?`,
    );
    stmt.run(change);
  } catch (err) {
    console.error(
      `Failed to update pseudoanonymisation setting to ${state}`,
      err,
    );
    throw new Error("Failed to update configuration.");
  }
}
