import { Database } from "bun:sqlite";
import { HandData } from "../src/api/data";

// Create a new SQLite database (file-based or in-memory)

new HandData().initDb();
