import type { GameResult } from "../poker/hand";
import { HandData } from "./data";
import { Database } from "bun:sqlite";

export class HandComparison {
  private handData: HandData;
  constructor(handData: HandData) {
    this.handData = handData;
  }

  compare(handId: string, anotherHandId: string): GameResult {
    throw new Error("Not implemented yet");
  }
}
