import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const configServer = {
  // Change in .gitignore if using for dev purposes.
  dbName: path.join(__dirname, "kaleistats.db"),
};
