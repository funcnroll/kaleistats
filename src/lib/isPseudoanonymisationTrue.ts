"use server";
import db from "@/db/index";

export async function isPseudoanonymisationTrue() {
  const row = db
    .prepare(`SELECT pseudoanonymisation_enabled FROM config `)
    .get() as { pseudoanonymisation_enabled: number };

  const state = row.pseudoanonymisation_enabled === 1 ? true : false;
  return state;
}
