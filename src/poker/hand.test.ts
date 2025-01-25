import { describe, test, expect } from "bun:test";
import { Card, GameResult, Hand, Suits } from "./hand";
describe("compare hand", () => {
  test.skip("straight flush win four of a kind", () => {
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
  });
});
