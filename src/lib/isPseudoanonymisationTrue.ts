"use server";
import db from "@/db/index";

export async function isPseudoanonymisationTrue() {
  try {
    const row = db
      .prepare(`SELECT pseudoanonymisation_enabled FROM config `)
      .get() as { pseudoanonymisation_enabled: number };

    const state = row.pseudoanonymisation_enabled === 1 ? true : false;
    return state;
  } catch (err) {
    console.error("Failed to get pseudoanonymisation status", err);
    throw new Error("Failed to get pseudoanonymisation status");
  }
}
