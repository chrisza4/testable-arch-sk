import type { GameResult, Hand } from "../src/poker/hand";

export enum Rank {
  Nothing = 0,
  OnePair = 1,
  TwoPairs = 2,
  ThreeOfAKind = 3,
  Straight = 4,
  Flush = 5,
  FullHouse = 6,
  FourOfAKind = 7,
  StraightFlush = 8,
}

class HandRank {
  constructor(rank: Rank, highs: any) {
    throw new Error("Not yet implemented");
  }

  public compare(another: HandRank): GameResult {
    throw new Error("Not yet implemented");
  }

  public getRank(): Rank {
    throw new Error("Not yet implemented");
  }

  public getHighs(): unknown {
    throw new Error("Not yet implemented");
  }
}
