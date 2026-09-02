import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { config } from "../../config";

export const auth = betterAuth({
  database: new Database(config.dbName),

  emailAndPassword: {
    enabled: true,
  },
});
