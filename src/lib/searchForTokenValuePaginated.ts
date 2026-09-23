"use server";
import db from "@/db/index";
import { TokenObjectDb } from "@/types/TokenObjectDb";
import { sharedConfig } from "../../config/sharedConfig";

export async function searchForTokenValuePaginated(
  filter: string,
  search: string,
  page: number,
) {
  try {
    const lastValue =
      page * sharedConfig.tokensPerPage - sharedConfig.tokensPerPage;

    if (filter === "uuid") {
      return db
        .prepare(
          `SELECT * FROM tokens WHERE tokenUUID LIKE ? ORDER BY id LIMIT ? OFFSET ?`,
        )
        .all(
          `%${search}%`,
          sharedConfig.tokensPerPage,
          lastValue,
        ) as TokenObjectDb[];
    }

    if (filter === "status") {
      return db
        .prepare(
          `SELECT * FROM tokens WHERE status = ? ORDER BY id LIMIT ? OFFSET ?`,
        )
        .all(search, sharedConfig.tokensPerPage, lastValue) as TokenObjectDb[];
    }
  } catch (err) {
    console.error(
      `Failed to search tokens with filter "${filter}" and query "${search}"`,
      err,
    );
    throw new Error("Failed to search tokens.");
  }
}
