import { test, expect } from "bun:test";
import { prinableResult } from "./printer";
import { GameResult } from "./poker/hand";

test("printableResult", () => {
  expect(prinableResult(GameResult.Win)).toEqual("Player 1 win!");
  expect(prinableResult(GameResult.Lose)).toEqual("Player 2 win!");
  expect(prinableResult(GameResult.Draw)).toEqual("Draw");
});
