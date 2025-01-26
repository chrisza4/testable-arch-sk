import { GameResult } from "./poker/hand";

export function prinableResult(result: GameResult): string {
  switch (result) {
    case GameResult.Win:
      return "Player 1 win!";
    case GameResult.Lose:
      return "Player 2 win!";
    case GameResult.Draw:
      return "Draw";
  }
}
