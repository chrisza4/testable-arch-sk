import * as uuid from "uuid";
import type { HandComparison } from "./model";
import { GameResult } from "../poker/hand";

export class Controller {
  private handComparison: HandComparison;
  constructor(handComparison: HandComparison) {
    this.handComparison = handComparison;
  }

  async handle(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const match = url.pathname.match("/api/(.+)/showdown");
    const method = req.method;
    if (!match || method !== "POST") {
      return new Response("unsupported", {
        status: 501,
      });
    }
    const handId = match[1];
    try {
      const body = await req.json();
      const anotherHandId = body["another_hand_id"];
      if (!anotherHandId) {
        return new Response("invalid request", { status: 422 });
      }
      if (!(uuid.validate(handId) && uuid.validate(anotherHandId))) {
        return new Response("invalid request", { status: 422 });
      }
      const gameResult = this.handComparison.compare(handId, anotherHandId);

      return new Response(
        JSON.stringify({
          result: getResult(gameResult),
        })
      );
    } catch (err) {
      if (err instanceof SyntaxError) {
        return new Response("invalid request", {
          status: 422,
        });
      }
      if ((err as Error).message === "Cannot find hand") {
        return new Response("Hand not found", {
          status: 404,
        });
      }
      return new Response("unexpected error", {
        status: 500,
      });
    }
  }
}

function getResult(result: GameResult): string {
  switch (result) {
    case GameResult.Win:
      return "win";
    case GameResult.Lose:
      return "lose";
    case GameResult.Draw:
      return "draw";
  }
}
