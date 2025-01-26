import { describe, test, expect, it } from "bun:test";
import { Rank, HandRank, handRankFromHand, CardFrequency } from "./handRank";
import { Card, GameResult, Hand, Suits } from "./hand";

const allRanks = [
  Rank.Nothing,
  Rank.OnePair,
  Rank.TwoPairs,
  Rank.ThreeOfAKind,
  Rank.Straight,
  Rank.Flush,
  Rank.FullHouse,
  Rank.FourOfAKind,
  Rank.StraightFlush,
];
function allRankExcept(excepts: Rank[]) {
  return allRanks.filter((c) => !excepts.includes(c));
}

describe("Hand rank comparison", () => {
  describe("Decide by higher rank", () => {
    test("Straight flush win every other rank", () => {
      const toWin = allRankExcept([Rank.StraightFlush]);
      const toLose: Rank[] = [];
      const testingRank = Rank.StraightFlush;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }
    });

    test("Four of a kind win everything except straight flush", () => {
      const toWin = allRankExcept([Rank.StraightFlush, Rank.FourOfAKind]);
      const toLose = [Rank.StraightFlush];
      const testingRank = Rank.FourOfAKind;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }
      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });

    test("Fullhouse", () => {
      const toWin = allRankExcept([
        Rank.StraightFlush,
        Rank.FourOfAKind,
        Rank.FullHouse,
      ]);
      const toLose = [Rank.StraightFlush, Rank.FourOfAKind];
      const testingRank = Rank.FullHouse;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }
      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });

    test("Flush", () => {
      const toWin = allRankExcept([
        Rank.StraightFlush,
        Rank.FourOfAKind,
        Rank.FullHouse,
        Rank.Flush,
      ]);
      const toLose = [Rank.StraightFlush, Rank.FourOfAKind, Rank.FullHouse];
      const testingRank = Rank.Flush;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }
      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });

    test("Straight", () => {
      const toWin = allRankExcept([
        Rank.StraightFlush,
        Rank.FourOfAKind,
        Rank.FullHouse,
        Rank.Flush,
        Rank.Straight,
      ]);
      const toLose = [
        Rank.StraightFlush,
        Rank.FourOfAKind,
        Rank.FullHouse,
        Rank.Flush,
      ];
      const testingRank = Rank.Straight;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }
      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });

    test("Three of a kind", () => {
      const toWin = allRankExcept([
        Rank.StraightFlush,
        Rank.FourOfAKind,
        Rank.FullHouse,
        Rank.Flush,
        Rank.Straight,
        Rank.ThreeOfAKind,
      ]);
      const toLose = [
        Rank.StraightFlush,
        Rank.FourOfAKind,
        Rank.FullHouse,
        Rank.Flush,
        Rank.Straight,
      ];
      const testingRank = Rank.ThreeOfAKind;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }
      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });

    test("Two pairs", () => {
      const toWin = allRankExcept([
        Rank.StraightFlush,
        Rank.FourOfAKind,
        Rank.FullHouse,
        Rank.Flush,
        Rank.Straight,
        Rank.ThreeOfAKind,
        Rank.TwoPairs,
      ]);
      const toLose = [
        Rank.StraightFlush,
        Rank.FourOfAKind,
        Rank.FullHouse,
        Rank.Flush,
        Rank.Straight,
        Rank.ThreeOfAKind,
      ];
      const testingRank = Rank.TwoPairs;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }
      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });

    test("One Pair", () => {
      const toWin = allRankExcept([
        Rank.StraightFlush,
        Rank.FourOfAKind,
        Rank.FullHouse,
        Rank.Flush,
        Rank.Straight,
        Rank.ThreeOfAKind,
        Rank.TwoPairs,
        Rank.OnePair,
      ]);
      const toLose = allRankExcept([Rank.Nothing, Rank.OnePair]);
      const testingRank = Rank.OnePair;
      for (const rank of toWin) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      }
      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });

    test("Nothing", () => {
      const toLose = allRankExcept([Rank.Nothing]);
      const testingRank = Rank.Nothing;
      for (const rank of toLose) {
        const thisRank = new HandRank(testingRank, []);
        const otherRank = new HandRank(rank, []);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      }
    });
  });

  describe.each([[Rank.FullHouse], [Rank.FourOfAKind]])(
    "Same rank, decide by highs",
    (rank) => {
      test("When highs is higher, return win", () => {
        // Notes: We can test every rank and highs combination, but it can be overkilled
        // This is a place where we actually "designed" by sampling
        const thisRank = new HandRank(rank, [10, 3]);
        const otherRank = new HandRank(rank, [9, 1]);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
      });

      test("When highs is lower, return lost", () => {
        const thisRank = new HandRank(rank, [12, 11]);
        const otherRank = new HandRank(rank, [14, 13]);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
      });

      test("When highs is equals, return draw", () => {
        const thisRank = new HandRank(rank, [12, 11]);
        const otherRank = new HandRank(rank, [12, 11]);
        expect(thisRank.compare(otherRank)).toEqual(GameResult.Draw);
      });
    }
  );
});

describe("hand rank from hand", () => {
  test("Can determined Straight Flush", () => {
    const straighFlushCards = [
      new Card(14, Suits.Club),
      new Card(13, Suits.Club),
      new Card(12, Suits.Club),
      new Card(10, Suits.Club),
      new Card(11, Suits.Club),
    ];
    const cards = straighFlushCards;
    const hand = new Hand(cards);
    const result = handRankFromHand(hand);
    expect(result.getRank()).toEqual(Rank.StraightFlush);
    expect(result.getHighs()).toEqual([14, 13, 12, 11, 10]);
  });

  test("Can determined Four of a kind", () => {
    const straighFlushCards = [
      new Card(4, Suits.Club),
      new Card(4, Suits.Club),
      new Card(4, Suits.Club),
      new Card(4, Suits.Club),
      new Card(11, Suits.Club),
    ];
    const cards = straighFlushCards;
    const hand = new Hand(cards);
    const result = handRankFromHand(hand);
    expect(result.getRank()).toEqual(Rank.FourOfAKind);
    expect(result.getHighs()).toEqual([4, 11]);
  });

  test("Can determined two pair", () => {
    const cards = [
      new Card(10, Suits.Club),
      new Card(10, Suits.Diamond),
      new Card(11, Suits.Club),
      new Card(12, Suits.Club),
      new Card(11, Suits.Club),
    ];
    const hand = new Hand(cards);
    const result = handRankFromHand(hand);
    expect(result.getRank()).toEqual(Rank.TwoPairs);
    expect(result.getHighs()).toEqual([11, 10, 12]);
  });

  test("Can determined three of a kind", () => {
    const cards = [
      new Card(10, Suits.Club),
      new Card(12, Suits.Diamond),
      new Card(11, Suits.Club),
      new Card(11, Suits.Club),
      new Card(11, Suits.Club),
    ];
    const hand = new Hand(cards);
    const result = handRankFromHand(hand);
    expect(result.getRank()).toEqual(Rank.ThreeOfAKind);
    expect(result.getHighs()).toEqual([11, 12, 10]);
  });

  test("Can determined straight", () => {
    const cards = [
      new Card(10, Suits.Club),
      new Card(11, Suits.Diamond),
      new Card(12, Suits.Club),
      new Card(13, Suits.Club),
      new Card(14, Suits.Club),
    ];
    const hand = new Hand(cards);
    const result = handRankFromHand(hand);
    expect(result.getRank()).toEqual(Rank.Straight);
    expect(result.getHighs()).toEqual([14, 13, 12, 11, 10]);
  });

  test("Can determined straight ace first", () => {
    const cards = [
      new Card(14, Suits.Club),
      new Card(2, Suits.Diamond),
      new Card(3, Suits.Club),
      new Card(4, Suits.Club),
      new Card(5, Suits.Club),
    ];
    const hand = new Hand(cards);
    const result = handRankFromHand(hand);
    expect(result.getRank()).toEqual(Rank.Straight);
    expect(result.getHighs()).toEqual([5, 4, 3, 2, 1]);
  });

  test("Can determined flush", () => {
    const cards = [
      new Card(14, Suits.Club),
      new Card(2, Suits.Club),
      new Card(5, Suits.Club),
      new Card(3, Suits.Club),
      new Card(10, Suits.Club),
    ];
    const hand = new Hand(cards);
    const result = handRankFromHand(hand);
    expect(result.getRank()).toEqual(Rank.Flush);
    expect(result.getHighs()).toEqual([14, 10, 5, 3, 2]);
  });

  test("Can determined Full-house", () => {
    const cards = [
      new Card(14, Suits.Club),
      new Card(14, Suits.Diamond),
      new Card(11, Suits.Club),
      new Card(11, Suits.Diamond),
      new Card(11, Suits.Heart),
    ];
    const hand = new Hand(cards);
    const result = handRankFromHand(hand);
    expect(result.getRank()).toEqual(Rank.FullHouse);
    expect(result.getHighs()).toEqual([11, 14]);
  });

  test("Can determined no pair", () => {
    const noPairCards = [
      new Card(10, Suits.Club),
      new Card(5, Suits.Diamond),
      new Card(14, Suits.Club),
      new Card(12, Suits.Club),
      new Card(11, Suits.Club),
    ];
    const hand = new Hand(noPairCards);
    const result = handRankFromHand(hand);
    expect(result.getRank()).toEqual(Rank.Nothing);
    expect(result.getHighs()).toEqual([14, 12, 11, 10, 5]);
  });
});

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
