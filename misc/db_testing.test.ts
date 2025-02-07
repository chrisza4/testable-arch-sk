import { test, expect, mock } from "bun:test";
import { Database, Statement } from "bun:sqlite";

export class Data {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  getById(id: number) {
    return this.db.query<any, any>(`SELECT * FROM user WHERE id = ${id}`).get();
  }
}

test("GetById", () => {
  // Prepare mocking
  const db = new Database();
  const statement = new Statement<any>({});
  statement.get = mock(function () {
    return { id: 1, username: "chris" };
  });
  const mockQuery = mock(() => statement);
  db.query = mockQuery;

  // Start testing
  const subject = new Data(db);
  const result = subject.getById(1);
  expect(result.id).toEqual(1);
  expect(result.username).toEqual("chris");
  // Here
  expect(mockQuery).toBeCalledWith("SELECT * FROM user WHERE id = 1");
});
