import { GameResult } from "./hand";

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

export class HandRank {
  private rank: Rank;
  private highs: number[];

  constructor(rank: Rank, highs: number[]) {
    this.rank = rank;
    this.highs = highs;
  }

  public compare(another: HandRank): GameResult {
    if (this.rank > another.getRank()) {
      return GameResult.Win;
    } else if (this.rank < another.getRank()) {
      return GameResult.Lose;
    }

    const anotherHighs = another.getHighs();
    for (let i = 0; i < this.getHighs().length; i++) {
      const thisHigh = this.getHighs()[i];
      const anotherHigh = anotherHighs[i];
      if (thisHigh > anotherHigh) {
        return GameResult.Win;
      } else if (thisHigh < anotherHigh) {
        return GameResult.Lose;
      }
    }
    return GameResult.Draw;
  }

  public getRank(): Rank {
    return this.rank;
  }

  public getHighs(): number[] {
    return this.highs;
  }
}
