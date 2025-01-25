import { describe, expect, test } from "bun:test";
import { Reader as CardReader } from "./reader";
import path from "path";
import { Suits } from "./poker/hand";

describe("reader", () => {
  test("can read card", () => {
    const cardReader = new CardReader(
      path.join(__dirname, "../test_assets/sample.json")
    );
    const actual = cardReader.read();
    expect(actual.length).toEqual(2);
    const [hand1, hand2] = actual;

    expect(hand1.cards[0].suits).toEqual(Suits.Spade);
    expect(hand1.cards[0].number).toEqual(3);

    expect(hand1.cards[1].suits).toEqual(Suits.Spade);
    expect(hand1.cards[1].number).toEqual(4);

    expect(hand1.cards[2].suits).toEqual(Suits.Spade);
    expect(hand1.cards[2].number).toEqual(5);

    expect(hand1.cards[3].suits).toEqual(Suits.Spade);
    expect(hand1.cards[3].number).toEqual(12);

    expect(hand1.cards[4].suits).toEqual(Suits.Spade);
    expect(hand1.cards[4].number).toEqual(11);

    expect(hand2.cards.length).toEqual(5);

    expect(hand2.cards[0].suits).toEqual(Suits.Diamond);
    expect(hand2.cards[0].number).toEqual(3);

    expect(hand2.cards[1].suits).toEqual(Suits.Spade);
    expect(hand2.cards[1].number).toEqual(3);

    expect(hand2.cards[2].suits).toEqual(Suits.Heart);
    expect(hand2.cards[2].number).toEqual(3);

    expect(hand2.cards[3].suits).toEqual(Suits.Heart);
    expect(hand2.cards[3].number).toEqual(12);

    expect(hand2.cards[4].suits).toEqual(Suits.Club);
    expect(hand2.cards[4].number).toEqual(10);
  });

  test("throw error if file not exists", () => {
    const cardReader = new CardReader(
      path.join(__dirname, "../test_assets/file_not_exists.json")
    );
    expect(() => cardReader.read()).toThrowError("file_not_exists");
  });

  test("throw error if file is not a valid json", () => {
    const cardReader = new CardReader(
      path.join(__dirname, "../test_assets/sample_invalid_json.txt")
    );
    expect(() => cardReader.read()).toThrowError("not_json");
  });

  describe("throw error if file is a valid json but not in the right format", () => {
    test("when player is incorrect", () => {
      const cardReader = new CardReader(
        path.join(__dirname, "../test_assets/sample_json_wrong_format.json")
      );
      expect(() => cardReader.read()).toThrowError("invalid_json_input");
    });
  });
});
