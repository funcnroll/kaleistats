"use server";
import db from "@/db/index";
import { TokenObjectDb } from "@/types/TokenObjectDb";

export async function searchForTokenValue(filter: string, search: string) {
  if (filter === "uuid") {
    return db
      .prepare(`SELECT * FROM tokens WHERE tokenUUID LIKE ? `)
      .all(`%${search}%`) as TokenObjectDb[];
  }

  if (filter === "status") {
    return db
      .prepare(`SELECT * FROM tokens WHERE status = ? `)
      .all(search) as TokenObjectDb[];
  }
}
