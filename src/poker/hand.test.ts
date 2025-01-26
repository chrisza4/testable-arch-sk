import { describe, test, expect } from "bun:test";
import { Card, GameResult, Hand, Suits } from "./hand";
describe("compare hand", () => {
  test("Determine winner correctly for different rank", () => {
    const hand1 = new Hand([
      new Card(10, Suits.Club),
      new Card(11, Suits.Club),
      new Card(12, Suits.Club),
      new Card(13, Suits.Club),
      new Card(14, Suits.Club),
    ]);

    const hand2 = new Hand([
      new Card(14, Suits.Diamond),
      new Card(14, Suits.Spade),
      new Card(14, Suits.Heart),
      new Card(14, Suits.Club),
      new Card(13, Suits.Club),
    ]);

    expect(hand1.compare(hand2)).toEqual(GameResult.Win);
    expect(hand2.compare(hand1)).toEqual(GameResult.Lose);
  });

  test("Determine winner correctly for same rank, different highs", () => {
    const hand1 = new Hand([
      new Card(10, Suits.Club),
      new Card(10, Suits.Club),
      new Card(10, Suits.Spade),
      new Card(11, Suits.Club),
      new Card(12, Suits.Club),
    ]);

    const hand2 = new Hand([
      new Card(11, Suits.Diamond),
      new Card(11, Suits.Spade),
      new Card(11, Suits.Heart),
      new Card(12, Suits.Club),
      new Card(8, Suits.Club),
    ]);

    expect(hand1.compare(hand2)).toEqual(GameResult.Lose);
    expect(hand2.compare(hand1)).toEqual(GameResult.Win);
  });

  test("Determine draw", () => {
    const hand1 = new Hand([
      new Card(10, Suits.Club),
      new Card(11, Suits.Club),
      new Card(12, Suits.Spade),
      new Card(13, Suits.Club),
      new Card(14, Suits.Club),
    ]);

    const hand2 = new Hand([
      new Card(10, Suits.Diamond),
      new Card(11, Suits.Spade),
      new Card(12, Suits.Heart),
      new Card(13, Suits.Club),
      new Card(14, Suits.Club),
    ]);

    expect(hand1.compare(hand2)).toEqual(GameResult.Draw);
  });
});
