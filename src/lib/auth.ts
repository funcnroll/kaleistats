import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { configServer } from "../../config/configServer";

export const auth = betterAuth({
  database: new Database(configServer.dbName),

  emailAndPassword: {
    enabled: true,
  },
});
