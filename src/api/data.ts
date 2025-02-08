import * as uuid from "uuid";
import { Database } from "bun:sqlite";
import { Card, Hand, Suits } from "../poker/hand";
export class HandData {
  private db: Database;

  constructor(db: Database) {
    this.db = db;
  }

  initDb() {
    this.db.run(`
    CREATE TABLE IF NOT EXISTS hands (
      id TEXT PRIMARY KEY
    );
    CREATE TABLE IF NOT EXISTS cards (
      id TEXT PRIMARY KEY,
      handId TEXT,
      number INTEGER,
      suit TEXT
    );
  `);
    console.log("Table created successfully!");
  }

  seed() {
    this.db.run(`
    INSERT INTO hands (id) VALUES ("38657dac-446c-4b98-bc9f-09f4daeeb30f");
    INSERT INTO cards (id, handId, number, suit) VALUES 
      ("${uuid.v4()}", "38657dac-446c-4b98-bc9f-09f4daeeb30f", 13, "heart");
    INSERT INTO cards (id, handId, number, suit) VALUES 
      ("${uuid.v4()}", "38657dac-446c-4b98-bc9f-09f4daeeb30f", 12, "diamond");
    INSERT INTO cards (id, handId, number, suit) VALUES 
      ("${uuid.v4()}", "38657dac-446c-4b98-bc9f-09f4daeeb30f", 13, "club");
    INSERT INTO cards (id, handId, number, suit) VALUES 
      ("${uuid.v4()}", "38657dac-446c-4b98-bc9f-09f4daeeb30f", 13, "spade");
    INSERT INTO cards (id, handId, number, suit) VALUES 
      ("${uuid.v4()}", "38657dac-446c-4b98-bc9f-09f4daeeb30f", 10, "spade");
    INSERT INTO hands (id) VALUES ("55314f63-9631-4d37-b7e7-2cf3748706aa");
    INSERT INTO cards (id, handId, number, suit) VALUES 
      ("${uuid.v4()}", "55314f63-9631-4d37-b7e7-2cf3748706aa", 11, "heart");
    INSERT INTO cards (id, handId, number, suit) VALUES 
      ("${uuid.v4()}", "55314f63-9631-4d37-b7e7-2cf3748706aa", 12, "diamond");
    INSERT INTO cards (id, handId, number, suit) VALUES 
      ("${uuid.v4()}", "55314f63-9631-4d37-b7e7-2cf3748706aa", 11, "club");
    INSERT INTO cards (id, handId, number, suit) VALUES 
      ("${uuid.v4()}", "55314f63-9631-4d37-b7e7-2cf3748706aa", 12, "spade");
    INSERT INTO cards (id, handId, number, suit) VALUES 
      ("${uuid.v4()}", "55314f63-9631-4d37-b7e7-2cf3748706aa", 10, "spade");
      `);
  }

  private suitsToEnum(suit: string): Suits {
    switch (suit) {
      case "heart":
        return Suits.Heart;
      case "diamond":
        return Suits.Diamond;
      case "club":
        return Suits.Club;
      case "spade":
        return Suits.Spade;
      default:
        throw new Error("Suit not found");
    }
  }

  getHandById(handId: string): Hand {
    const hand = this.db
      .query<any, []>(`SELECT * FROM hands WHERE id = "${handId}"`)
      .get();
    if (!hand) {
      throw new Error("Object not found");
    }
    const id: string = hand.id;

    const cards = this.db
      .query<any, []>(`SELECT * FROM cards WHERE handId = "${handId}"`)
      .all()
      .map((card) => {
        return new Card(card.number, this.suitsToEnum(card.suit));
      });
    return new Hand(cards);
  }
}
