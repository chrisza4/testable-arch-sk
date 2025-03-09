import { CardFrequency } from "./cardFrequency";
import { Card, GameResult, Hand } from "./hand";

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

function isConsecutive(cardSorted: Card[]): boolean {
  for (let index = 1; index < cardSorted.length; index++) {
    if (cardSorted[index - 1].number !== cardSorted[index].number + 1) {
      return false;
    }
  }
  return true;
}

function isFlush(cardSorted: Card[]): boolean {
  const suits = cardSorted[0].suits;
  for (const card of cardSorted) {
    if (card.suits !== suits) {
      return false;
    }
  }
  return true;
}

function arrayValueEquals(arr1: number[], arr2: number[]): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }
  return true;
}
export function handRankFromHand(hand: Hand): HandRank {
  // How to check
  // 1 -> Check card number duplication frequency
  //     (3 1 1) = 3 of a kind
  //     (3 2) = Full house
  //     (4 1) = 4 of a kind
  //     (2 2 1) = 2 pairs
  // This worth having nother subunit: Transform cards to freqeuncy
  // 2 -> Check consecutive (Ace first, Ace last)
  // 10 J Q K A -> Straight
  // A 2 3 4 5 -> Straight
  // 3 -> Check flush
  // Noted that 2,3 is too small to have unit

  let cardSorted = hand.cards.sort((a, b) => b.number - a.number);

  const cardNumbers = [];
  for (const card of cardSorted) {
    cardNumbers.push(card.number);
  }

  // Special case for straight ace first
  if (arrayValueEquals(cardNumbers, [14, 5, 4, 3, 2])) {
    cardSorted[0].number = 1;
    // Reshuffle, put ace last
    cardSorted = [
      cardSorted[1],
      cardSorted[2],
      cardSorted[3],
      cardSorted[4],
      cardSorted[0],
    ];
  }

  const consequtive = isConsecutive(cardSorted);
  const flush = isFlush(cardSorted);
  const cardFrequency = new CardFrequency(hand.cards);
  if (consequtive && flush) {
    return new HandRank(
      Rank.StraightFlush,
      cardFrequency.cardValueSortedByFrequency()
    );
  }
  if (cardFrequency.isFrequencyMatch([4, 1])) {
    return new HandRank(
      Rank.FourOfAKind,
      cardFrequency.cardValueSortedByFrequency()
    );
  }
  if (cardFrequency.isFrequencyMatch([3, 2])) {
    return new HandRank(
      Rank.FullHouse,
      cardFrequency.cardValueSortedByFrequency()
    );
  }
  if (flush) {
    return new HandRank(Rank.Flush, cardFrequency.cardValueSortedByFrequency());
  }
  if (consequtive) {
    return new HandRank(
      Rank.Straight,
      cardFrequency.cardValueSortedByFrequency()
    );
  }
  if (cardFrequency.isFrequencyMatch([3, 1, 1])) {
    return new HandRank(
      Rank.ThreeOfAKind,
      cardFrequency.cardValueSortedByFrequency()
    );
  }
  if (cardFrequency.isFrequencyMatch([2, 2, 1])) {
    return new HandRank(
      Rank.TwoPairs,
      cardFrequency.cardValueSortedByFrequency()
    );
  }
  if (cardFrequency.isFrequencyMatch([2, 1, 1, 1])) {
    return new HandRank(
      Rank.TwoPairs,
      cardFrequency.cardValueSortedByFrequency()
    );
  }
  return new HandRank(Rank.Nothing, cardNumbers);
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
