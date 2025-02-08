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

test("CardEquals", () => {
  const card1 = new Card(11, Suits.Diamond);
  expect(card1.equals(new Card(13, Suits.Diamond))).toBeFalse();
  expect(card1.equals(new Card(13, Suits.Heart))).toBeFalse();
  expect(card1.equals(new Card(11, Suits.Diamond))).toBeTrue();
});

describe("CardExists", () => {
  test("Check if card exists in had", () => {
    const hand = new Hand([new Card(13, Suits.Diamond)]);
    expect(hand.cardExists(new Card(13, Suits.Diamond))).toBeTrue();
    expect(hand.cardExists(new Card(13, Suits.Heart))).toBeFalse();
    expect(hand.cardExists(new Card(11, Suits.Diamond))).toBeFalse();
  });
});

describe("validate", () => {
  test("validate hand return false if hand have less than 5 card", () => {
    const hand = new Hand([new Card(13, Suits.Diamond)]);
    expect(hand.validate()).toBeFalse();
  });

  test("validate hand return false if hand have more than 5 card", () => {
    const hand = new Hand([
      new Card(13, Suits.Diamond),
      new Card(13, Suits.Heart),
      new Card(13, Suits.Club),
      new Card(13, Suits.Spade),
      new Card(11, Suits.Club),
      new Card(4, Suits.Spade),
    ]);
    expect(hand.validate()).toBeFalse();
  });

  test("validate hand return true if hand have less than 5 card", () => {
    const hand = new Hand([new Card(13, Suits.Diamond)]);
    expect(hand.validate()).toBeFalse();
  });
});
