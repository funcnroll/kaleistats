"use server";
import db from "@/db/index";
import { TokenObjectDb } from "@/types/TokenObjectDb";
import { configServer } from "../../config/configServer";

export async function searchForTokenValuePaginated(
  filter: string,
  search: string,
  page: number,
) {
  try {
    const lastValue =
      page * configServer.tokensPerPage - configServer.tokensPerPage;

    if (filter === "uuid") {
      return db
        .prepare(
          `SELECT * FROM tokens WHERE tokenUUID LIKE ? ORDER BY id LIMIT ? OFFSET ?`,
        )
        .all(
          `%${search}%`,
          configServer.tokensPerPage,
          lastValue,
        ) as TokenObjectDb[];
    }

    if (filter === "status") {
      return db
        .prepare(
          `SELECT * FROM tokens WHERE status = ? ORDER BY id LIMIT ? OFFSET ?`,
        )
        .all(search, configServer.tokensPerPage, lastValue) as TokenObjectDb[];
    }
  } catch (err) {
    console.error(
      `Failed to search tokens with filter "${filter}" and query "${search}"`,
      err,
    );
    throw new Error("Failed to search tokens.");
  }
}
