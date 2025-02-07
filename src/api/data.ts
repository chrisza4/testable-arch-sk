import * as uuid from "uuid";
import { Database } from "bun:sqlite";
import type { Hand } from "../poker/hand";
export class HandData {
  initDb() {
    const db = new Database("card.sqlite");
    db.run(`
    CREATE TABLE IF NOT EXISTS hands (
      id TEXT PRIMARY KEY
    );
    CREATE TABLE IF NOT EXISTS cards (
      id TEXT PRIMARY KEY,
      handId TEXT,
      number INTEGER,
      suit TEXT
    );
  
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
    console.log("Table created successfully!");
  }

  getHandById(handId: string): Hand {
    throw new Error("Not implemented");
  }
}
