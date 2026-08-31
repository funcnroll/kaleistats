import { betterAuth } from "better-auth";
import Database from "better-sqlite3";
import { config } from "../../config";
import { username } from "better-auth/plugins";

export const auth = betterAuth({
  database: new Database(config.dbName),

  emailAndPassword: {
    enabled: true,
  },
  plugins: [username()],
});
