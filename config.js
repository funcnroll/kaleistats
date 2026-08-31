import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const config = {
  // Change in .gitignore if using for dev purposes.
  dbName: path.join(__dirname, "kaleistats.db"),

  // For practical purposes, 3-8 traits are recommend.
  traits: [
    "Appearance",
    "Discipline",
    "Intelligence",
    "Health",
    "Charisma",
    "Creativity",
    "Wisdom",
    "Courage",
  ],

  // Change to your name or alias. This is used for the admin page and rating form.
  adminName: "Placeholder",
};
