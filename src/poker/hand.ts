export enum Suits {
  Spade,
  Diamond,
  Heart,
  Club,
}

export class Card {
  constructor(public number: number, public suits: Suits) {}
}

export enum GameResult {
  Win,
  Lose,
  Draw,
}

export class Hand {
  public cards: Card[] = [];
  constructor(cards: Card[]) {
    this.cards = cards;
  }

  public compare(another: Hand): GameResult {
    throw new Error("");
  }
}
