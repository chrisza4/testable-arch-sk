import fs from "fs";
import { Card, Hand, Suits } from "./poker/hand";
import z, { number, ZodError } from "zod";

const schema = z.object({
  player1: z.array(
    z.object({
      suits: z.enum(["spade", "heart", "club", "diamond"]),
      number: z.number().max(13).min(1),
    })
  ),
  player2: z.array(
    z.object({
      suits: z.enum(["spade", "heart", "club", "diamond"]),
      number: z.number().max(13).min(1),
    })
  ),
});

export class Reader {
  private path: string;
  constructor(path: string) {
    this.path = path;
  }

  // Note: In aspect of OOP design, one can argue that this should be in Card constructor or Suit
  // But it is not really clear since using Suits as string might be valid in only reader domain
  // Since we aren't focus on OOP design right now and it is easier to see changes in one file
  private suitFromString(src: string): Suits {
    switch (src) {
      case "spade":
        return Suits.Spade;
      case "diamond":
        return Suits.Diamond;
      case "heart":
        return Suits.Heart;
      case "club":
        return Suits.Club;
      default:
        throw new Error("Invalid suits");
    }
  }

  read(): Hand[] {
    if (!fs.existsSync(this.path)) {
      throw new Error("file_not_exists");
    }
    try {
      const rawInput = JSON.parse(
        fs.readFileSync(this.path, { encoding: "utf-8" })
      );

      const input = schema.parse(rawInput);

      const cards1: Card[] = [];
      for (const card of input.player1) {
        cards1.push(new Card(card.number, this.suitFromString(card.suits)));
      }

      const cards2: Card[] = [];
      for (const card of input.player2) {
        cards2.push(new Card(card.number, this.suitFromString(card.suits)));
      }
      return [new Hand(cards1), new Hand(cards2)];
    } catch (e) {
      if (e instanceof SyntaxError) {
        throw new Error("not_json");
      }
      if (e instanceof ZodError) {
        throw new Error("invalid_json_input");
      }
      throw e;
    }
  }
}
