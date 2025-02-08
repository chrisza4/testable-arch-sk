/* 

Write model layer and hand data layer, including test

Helping
- Using sqlite for simplicity
- Hand data is already being scaffold
- Initial DB

Spec of Hand Data:
  - If data exists, return Hand object with cards
  - If data does not exists, throw error('Object not found')

Addition to hand
  - Add validate method. If hand have exactly 5 card, return true. Otherwise, false

Spec of hand model
  - Use hand data to get hand info
    - If hand data error 'Object not found', throw error ('Cannot find hand')
    - If hand data is invalid (using hand validation method), throw error ('Cannot find hand')
      - This system assume that hand with less than 5 card = some error = hand not found
  - Determine win / lose result

Cover everything with test.

Interesting question:
- How to we test data layer?
  - Use integration testing on data layer
- How to test model individually?
  - Leave for excersise

*/

import * as uuid from "uuid";
import { Database } from "bun:sqlite";
import { Hand } from "../src/poker/hand";
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

  getHandById(handId: string): Hand {
    throw Error("Not implemented yet");
  }
}
