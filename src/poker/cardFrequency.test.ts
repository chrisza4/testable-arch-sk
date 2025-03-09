import { describe, test, expect, it } from "bun:test";
import { Card, Suits } from "./hand";
import { CardFrequency } from "./cardFrequency";

describe("Card frequencies", () => {
  test("Can calculate frequency and card values", () => {
    const card1 = [
      new Card(14, Suits.Club),
      new Card(14, Suits.Diamond),
      new Card(11, Suits.Club),
      new Card(11, Suits.Diamond),
      new Card(11, Suits.Heart),
    ];
    const card2 = [
      new Card(14, Suits.Club),
      new Card(2, Suits.Club),
      new Card(5, Suits.Club),
      new Card(3, Suits.Club),
      new Card(10, Suits.Club),
    ];

    const card3 = [
      new Card(10, Suits.Club),
      new Card(12, Suits.Diamond),
      new Card(11, Suits.Club),
      new Card(11, Suits.Club),
      new Card(11, Suits.Club),
    ];

    const result1 = new CardFrequency(card1);
    expect(result1.cardFrequencySorted()).toEqual([3, 2]);
    expect(result1.cardValueSortedByFrequency()).toEqual([11, 14]);

    const result2 = new CardFrequency(card2);
    expect(result2.cardFrequencySorted()).toEqual([1, 1, 1, 1, 1]);
    expect(result2.cardValueSortedByFrequency()).toEqual([14, 10, 5, 3, 2]);

    const result3 = new CardFrequency(card3);
    expect(result3.cardFrequencySorted()).toEqual([3, 1, 1]);
    expect(result3.cardValueSortedByFrequency()).toEqual([11, 12, 10]);
  });

  test("Can match frequency pattern", () => {
    const card1 = [
      new Card(14, Suits.Club),
      new Card(14, Suits.Diamond),
      new Card(11, Suits.Club),
      new Card(11, Suits.Diamond),
      new Card(11, Suits.Heart),
    ];
    const card2 = [
      new Card(14, Suits.Club),
      new Card(2, Suits.Club),
      new Card(5, Suits.Club),
      new Card(3, Suits.Club),
      new Card(10, Suits.Club),
    ];

    const card3 = [
      new Card(10, Suits.Club),
      new Card(12, Suits.Diamond),
      new Card(11, Suits.Club),
      new Card(11, Suits.Club),
      new Card(11, Suits.Club),
    ];

    const result1 = new CardFrequency(card1);
    const result2 = new CardFrequency(card2);
    const result3 = new CardFrequency(card3);

    expect(result1.isFrequencyMatch([3, 2])).toBeTruthy();
    expect(result1.isFrequencyMatch([3, 1, 1])).toBeFalsy();

    expect(result2.isFrequencyMatch([1, 1, 1, 1, 1])).toBeTruthy();
    expect(result2.isFrequencyMatch([2, 1, 1, 1])).toBeFalsy();

    expect(result3.isFrequencyMatch([3, 1, 1])).toBeTruthy();
    expect(result3.isFrequencyMatch([4, 1])).toBeFalsy();
  });
});
