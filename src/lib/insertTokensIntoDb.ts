"use server";
import db from "@/db/index";
import { TokenObject } from "@/types/TokenObject";

export async function insertTokensIntoDb(tokens: TokenObject[]) {
  // https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md#transactionfunction---function
  // According to the docs, this is the most efficient way to mass write

  const insert = db.prepare(
    `INSERT INTO tokens (tokenUUID, status, expireTime) VALUES (@tokenUUID, @tokenStatus, @tokenExpireTime)`,
  );

  const insertMany = db.transaction((tokens) => {
    for (const token of tokens) insert.run(token);
  });

  insertMany(tokens);
}
