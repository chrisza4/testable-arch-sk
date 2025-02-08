import { describe, test, expect } from "bun:test";
import { GameResultView } from "./view";
import { GameResult } from "../poker/hand";

describe("GameResultView", () => {
  test("should return result draw for gameResult draw", () => {
    const gameResult = GameResult.Draw;
    const view = new GameResultView(gameResult);
    expect(view.result).toEqual("draw");
  });

  test("should return result win for gameResult win", () => {
    const gameResult = GameResult.Win;
    const view = new GameResultView(gameResult);
    expect(view.result).toEqual("win");
  });

  test("should return result lose for gameResult lose", () => {
    const gameResult = GameResult.Lose;
    const view = new GameResultView(gameResult);
    expect(view.result).toEqual("lose");
  });
});
