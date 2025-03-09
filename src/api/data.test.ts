import { describe, test, expect, afterEach } from "bun:test";
import { Database } from "bun:sqlite";
import * as uuid from "uuid";
import { HandData } from "./data";
import { Card, Suits } from "../poker/hand";

describe("Data", () => {
  test("GetById return set of cards corresponding to id", () => {
    const db = new Database("test.sqlite");

    const handId = uuid.v4();
    const subject = new HandData(db);
    subject.initDb();

    db.run(`
          INSERT INTO hands (id) VALUES ("${handId}");
    INSERT INTO cards (id, handId, number, suit) VALUES 
      ("${uuid.v4()}", "${handId}", 13, "heart");
    INSERT INTO cards (id, handId, number, suit) VALUES 
      ("${uuid.v4()}", "${handId}", 12, "diamond");
    INSERT INTO cards (id, handId, number, suit) VALUES 
      ("${uuid.v4()}", "${handId}", 13, "club");
    INSERT INTO cards (id, handId, number, suit) VALUES 
      ("${uuid.v4()}", "${handId}", 13, "spade");
    INSERT INTO cards (id, handId, number, suit) VALUES 
      ("${uuid.v4()}", "${handId}", 10, "spade");
    INSERT INTO cards (id, handId, number, suit) VALUES 
      ("${uuid.v4()}", "randomHandId", 11, "spade");
      `);
    const result = subject.getHandById(handId);
    expect(result.cards.length).toEqual(5);
    expect(result.cardExists(new Card(13, Suits.Heart)));
    expect(result.cardExists(new Card(12, Suits.Diamond)));
    expect(result.cardExists(new Card(13, Suits.Club)));
    expect(result.cardExists(new Card(13, Suits.Spade)));
    expect(result.cardExists(new Card(10, Suits.Spade)));

    // Cleanup
    db.run(`DELETE FROM hands; 
      DELETE FROM cards;`);
  });

  test("GetById throw error 'object not found' when hands is not exists", () => {
    const db = new Database("test.sqlite");

    const handId = "not_exists_id";
    const subject = new HandData(db);
    subject.initDb();

    expect(() => subject.getHandById(handId)).toThrowError("Object not found");
  });

  afterEach(() => {
    // Cleanup should be here, but this is specific to Bun
  });
});
