export enum Suits {
  Spade,
  Diamond,
  Heart,
  Club,
}

export class Card {
  constructor(public number: number, public suits: Suits) {}
}

export class Hand {
  public cards: Card[] = [];
  constructor(cards: Card[]) {
    this.cards = cards;
  }
}
