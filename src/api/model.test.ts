import { describe, test, expect, mock } from "bun:test";
import { HandComparison } from "./model";
import { Database } from "bun:sqlite";
import { HandData } from "./data";
import { Card, GameResult, Hand, Suits } from "../poker/hand";

describe("HandComparison", () => {
  test("Should throw Hand not found when hand does not exists in data", () => {
    const handData = new HandData(new Database(":memory:"));
    handData.getHandById = mock(() => {
      throw new Error("Object not found");
    });

    const subject = new HandComparison(handData);
    expect(() => subject.compare("123", "456")).toThrowError(
      "Cannot find hand"
    );
  });

  test("Should throw Hand not found when hand is not valid", () => {
    const handData = new HandData(new Database(":memory:"));
    handData.getHandById = mock(() => {
      return new Hand([new Card(1, Suits.Club)]);
    });

    const subject = new HandComparison(handData);
    expect(() => subject.compare("123", "456")).toThrowError(
      "Cannot find hand"
    );
  });

  test("Should return result of comparison when win", () => {
    // We can also mock hand comparison by creating another hand comparison service as well
    // This is when we should design what level of integration do we have
    // In this case, I think it make sense to let both hand model and hand comparison module break
    // If hand comparison logic failed, let both break

    const handData = new HandData(new Database(":memory:"));
    handData.getHandById = mock((handId) => {
      if (handId === "123") {
        return new Hand([
          new Card(13, Suits.Heart),
          new Card(12, Suits.Diamond),
          new Card(13, Suits.Club),
          new Card(13, Suits.Spade),
          new Card(13, Suits.Heart),
        ]);
      }
      return new Hand([
        new Card(13, Suits.Heart),
        new Card(12, Suits.Diamond),
        new Card(13, Suits.Club),
        new Card(12, Suits.Spade),
        new Card(13, Suits.Heart),
      ]);
    });

    const subject = new HandComparison(handData);
    expect(subject.compare("123", "456")).toEqual(GameResult.Win);
  });

  test("Should return result of comparison when lose", () => {
    const handData = new HandData(new Database(":memory:"));
    handData.getHandById = mock((handId) => {
      if (handId === "123") {
        return new Hand([
          new Card(13, Suits.Heart),
          new Card(12, Suits.Diamond),
          new Card(13, Suits.Club),
          new Card(13, Suits.Spade),
          new Card(13, Suits.Heart),
        ]);
      }
      return new Hand([
        new Card(13, Suits.Heart),
        new Card(12, Suits.Diamond),
        new Card(13, Suits.Club),
        new Card(12, Suits.Spade),
        new Card(13, Suits.Heart),
      ]);
    });

    const subject = new HandComparison(handData);
    expect(subject.compare("456", "123")).toEqual(GameResult.Lose);
  });

  test("Should return result of comparison when draw", () => {
    const handData = new HandData(new Database(":memory:"));
    handData.getHandById = mock((handId) => {
      return new Hand([
        new Card(13, Suits.Heart),
        new Card(12, Suits.Diamond),
        new Card(13, Suits.Club),
        new Card(13, Suits.Spade),
        new Card(13, Suits.Heart),
      ]);
    });

    const subject = new HandComparison(handData);
    expect(subject.compare("456", "123")).toEqual(GameResult.Draw);
  });
});
