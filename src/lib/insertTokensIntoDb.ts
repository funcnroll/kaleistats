"use server";
import db from "@/db/index";
import { TokenObject } from "@/types/TokenObject";

export async function insertTokensIntoDb(tokens: TokenObject[]) {
  // https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#transactionfunction---function
  // According to the docs, this is the most efficient way to mass write

  try {
    const insert = db.prepare(
      `INSERT INTO tokens (tokenUUID, status, expireTime, fg_43F, Alj_1f, Eka_9b) VALUES (@tokenUUID, @tokenStatus, @tokenExpireTime, @fg_43F, @Alj_1f, @Eka_9b)`,
    );

    const insertMany = db.transaction((tokens) => {
      for (const token of tokens) insert.run(token);
    });

    insertMany(tokens);
  } catch (err) {
    console.error("Failed to insert Tokens into DB", err);
    throw new Error("Failed to insert Tokens into DB");
  }
}
