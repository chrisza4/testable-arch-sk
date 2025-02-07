import { test, expect, mock } from "bun:test";
import { Database, Statement } from "bun:sqlite";
import * as uuid from "uuid";

export class Data {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  getById(id: number) {
    return this.db
      .query<any, any>(`SELECT * FROM users WHERE id = ${id}`)
      .get();
  }
}

test("GetById", () => {
  const db = new Database("test.sqlite");
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT
    );`);

  const username = uuid.v4();
  const insertResult = db
    .query<{ id: number }, []>(
      `INSERT INTO users (username) VALUES ("${username}") RETURNING id`
    )
    .get();
  const subject = new Data(db);
  const result = subject.getById(insertResult?.id || 0);
  expect(result.username).toEqual(username);
});
