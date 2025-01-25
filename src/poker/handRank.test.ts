import { describe, test, expect } from "bun:test";
import { Rank, HandRank } from "./handRank";
import { GameResult } from "./hand";

describe("Hand rank comparison", () => {
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

  describe("Same rank, decide by highs", () => {
    test("When highs is higher, return win", () => {
      // Notes: We can test every rank, but it can be overkilled
      // This is a place where we actually "designed"
      const thisRank = new HandRank(Rank.FullHouse, [10, 3]);
      const otherRank = new HandRank(Rank.FullHouse, [9, 1]);
      expect(thisRank.compare(otherRank)).toEqual(GameResult.Win);
    });

    test("When highs is lower, return lost", () => {
      const thisRank = new HandRank(Rank.FullHouse, [12, 11]);
      const otherRank = new HandRank(Rank.FullHouse, [14, 13]);
      expect(thisRank.compare(otherRank)).toEqual(GameResult.Lose);
    });

    test("When highs is equals, return draw", () => {
      const thisRank = new HandRank(Rank.FullHouse, [12, 11]);
      const otherRank = new HandRank(Rank.FullHouse, [12, 11]);
      expect(thisRank.compare(otherRank)).toEqual(GameResult.Draw);
    });
  });
});
