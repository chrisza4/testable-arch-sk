import { handRankFromHand } from "./handRank";

export enum Suits {
  Spade,
  Diamond,
  Heart,
  Club,
}

export class Card {
  constructor(public number: number, public suits: Suits) {}

  equals(c: Card): boolean {
    return this.number === c.number && this.suits === c.suits;
  }
}

export enum GameResult {
  Win,
  Lose,
  Draw,
}

export class Hand {
  validate(): boolean {
    return this.cards.length === 5;
  }
  public cards: Card[] = [];
  constructor(cards: Card[]) {
    this.cards = cards;
  }

  public compare(another: Hand): GameResult {
    const thisRank = handRankFromHand(this);
    const anotherRank = handRankFromHand(another);
    return thisRank.compare(anotherRank);
  }

  // Helper for lesson when we implement everything
  public cardExists(card: Card): boolean {
    for (const existingCard of this.cards) {
      if (existingCard.equals(card)) {
        return true;
      }
    }
    return false;
  }
}
