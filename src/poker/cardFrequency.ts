import type { Card } from "./hand";

type FrequencyMap = { [key: number]: number };

export class CardFrequency {
  private cardFrequencyMap: FrequencyMap;
  constructor(cards: Card[]) {
    const cardFrequencyMap: FrequencyMap = {};
    for (const card of cards) {
      cardFrequencyMap[card.number] = (cardFrequencyMap[card.number] || 0) + 1;
    }
    this.cardFrequencyMap = cardFrequencyMap;
  }

  cardFrequencySorted(): number[] {
    return Object.values(this.cardFrequencyMap).sort().reverse();
  }

  private getCardValues() {
    return Object.keys(this.cardFrequencyMap).map((a) => parseInt(a));
  }

  cardValueSortedByFrequency(): number[] {
    return this.getCardValues().sort((b, a) => {
      if (this.cardFrequencyMap[a] < this.cardFrequencyMap[b]) return -1;
      if (this.cardFrequencyMap[a] > this.cardFrequencyMap[b]) return 1;
      if (a < b) return -1;
      if (b > a) return 1;
      return 0;
    });
  }

  isFrequencyMatch(dest: number[]): boolean {
    const src = this.cardFrequencySorted();
    if (src.length !== dest.length) {
      return false;
    }
    for (let i = 0; i < src.length; i++) {
      if (src[i] !== dest[i]) {
        return false;
      }
    }
    return true;
  }
}
