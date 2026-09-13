import Database from "better-sqlite3";
import { configServer } from "../../config/configServer.js";
import { configClient } from "../../config/configClient.js";

const db = new Database(configServer.dbName);
db.pragma("journal_mode = WAL");

// The design of the DB assumes only 1 admin
db.exec(`
  CREATE TABLE IF NOT EXISTS ratings (
    traitName TEXT,
    rating INTEGER
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tokenUUID TEXT,
    status TEXT,
    expireTime INTEGER
  );
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS config (
    id INTEGER PRIMARY KEY CHECK (id = 0), 
    pseudoanonymisation_enabled INTEGER NOT NULL
  );
`);

db.prepare(
  `
  INSERT OR IGNORE INTO config VALUES (0,1)`,
).run();

console.log("Database ready");
export default db;
