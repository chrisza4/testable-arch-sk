import { GameResult } from "../poker/hand";

export class GameResultView {
  public result: string = "";
  constructor(gameResult: GameResult) {
    this.result = this.resultToString(gameResult);
  }

  private resultToString(gameResult: GameResult): string {
    switch (gameResult) {
      case GameResult.Draw:
        return "draw";
      case GameResult.Win:
        return "win";
      case GameResult.Lose:
        return "lose";
    }
    throw Error("Unexpected");
  }
}
