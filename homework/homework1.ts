// Sample input
// {
//   "player1": [
//     { "suits": "spade", "number": 3 },
//     { "suits": "spade", "number": 4 },
//     { "suits": "spade", "number": 5 },
//     { "suits": "spade", "number": 12 },
//     { "suits": "spade", "number": 11 }
//   ],
//   "player2": [
//     { "suits": "diamond", "number": 3 },
//     { "suits": "spade", "number": 3 },
//     { "suits": "heart", "number": 3 },
//     { "suits": "heart", "number": 12 },
//     { "suits": "club", "number": 11 }
//   ]
// }

// Output below
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
}
