import Database from "better-sqlite3";
import { config} from "../../config.js"

const db = new Database(config.dbName);
db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS profiles (
    traits TEXT NOT NULL
  );
`);

const existing = db.prepare("SELECT * FROM profiles").get();

if(!existing) {
    const traitsJson = JSON.stringify(config.traits)

    db.prepare("INSERT INTO profiles (traits) VALUES (?)").run(traitsJson);

    console.log("Database initialised with traits")
}

console.log("Database ready")
export default db;