"use server";
import db from "@/db/index";
export async function setPseudoanonymisationInDb(state: boolean) {
  let change;
  if (state) change = 1;
  if (!state) change = 0;

  console.log(change);
  const stmt = db.prepare(`UPDATE config SET pseudoanonymisation_enabled = ?`);
  stmt.run(change);
}
