import { afterEach, describe, expect, test } from "bun:test";
import { startServer } from "../src/api/server";
import { Database } from "bun:sqlite";
import { HandData } from "../homework/homework5";

describe("integration test", () => {
  test("showdown api", async () => {
    // Setup database
    const dbName = "test.integration.sqlite";
    const db = new Database(dbName);
    const handData = new HandData(db);
    handData.initDb();
    handData.seed();

    const hand1Id = "38657dac-446c-4b98-bc9f-09f4daeeb30f";
    const hand2Id = "55314f63-9631-4d37-b7e7-2cf3748706aa";

    startServer(dbName);
    // Create request to local server
    const response = await fetch(
      `http://localhost:3000/api/${hand1Id}/showdown`,
      {
        method: "POST",
        body: JSON.stringify({
          another_hand_id: hand2Id,
        }),
      }
    );
    const responseObject = await response.json();
    expect(responseObject.result).toEqual("win");
  });

  afterEach(() => {
    const dbName = "test.integration.sqlite";
    const db = new Database(dbName);
    db.run(`DELETE FROM hands; 
      DELETE FROM cards;`);
  });
});
