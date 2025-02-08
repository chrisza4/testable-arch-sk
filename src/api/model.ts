import type { GameResult, Hand } from "../poker/hand";
import { HandData } from "./data";
import { Database } from "bun:sqlite";

export class HandComparison {
  private handData: HandData;
  constructor(handData: HandData) {
    this.handData = handData;
  }

  compare(handId: string, anotherHandId: string): GameResult {
    let hand: Hand, anotherHand: Hand;
    try {
      hand = this.handData.getHandById(handId);
      anotherHand = this.handData.getHandById(anotherHandId);
    } catch (err) {
      throw new Error("Cannot find hand");
    }
    if (!hand.validate() || !anotherHand.validate()) {
      throw new Error("Cannot find hand");
    }
    return hand.compare(anotherHand);
  }
}
