import { describe, test, expect, mock, spyOn } from "bun:test";
import { vi } from "vitest";
import { HandComparison } from "./model";
import { GameResult } from "../poker/hand";
import { Controller } from "./controller";
import * as uuid from "uuid";

class MockHandComparison extends HandComparison {
  private gameResult: GameResult;
  constructor(gameResult: GameResult = GameResult.Win) {
    super();
    this.gameResult = gameResult;
  }
  compare(handId: string, anotherHandId: string): GameResult {
    return this.gameResult;
  }
}

const simplePlayerId = uuid.v4();
describe("controller", () => {
  test("should return 501 with unsupported when api is called in other route", async () => {
    const subject = new Controller(new MockHandComparison());
    const request = new Request(new URL("/something", "http://host.com"), {
      method: "POST",
    });
    const result = await subject.handle(request);
    expect(result.status).toEqual(501);
    const body = await result.text();
    expect(body).toEqual("unsupported");
  });

  test("should return 422 with invalid request when body is not json", async () => {
    const subject = new Controller(new MockHandComparison());
    const request = new Request(
      new URL(`/api/${simplePlayerId}/showdown`, "http://host.com"),
      {
        method: "POST",
        body: "not a json",
      }
    );
    const result = await subject.handle(request);
    expect(result.status).toEqual(422);
    const body = await result.text();
    expect(body).toEqual("invalid request");
  });

  test("should return 422 with invalid request when body is json but does not have another_player_id", async () => {
    const subject = new Controller(new MockHandComparison());
    const request = new Request(
      new URL(`/api/${simplePlayerId}/showdown`, "http://host.com"),
      {
        method: "POST",
        body: JSON.stringify({
          random_field: "",
        }),
      }
    );
    const result = await subject.handle(request);
    expect(result.status).toEqual(422);
    const body = await result.text();
    expect(body).toEqual("invalid request");
  });

  test("should return 422 with invalid request when another_player_id is not uuid", async () => {
    const subject = new Controller(new MockHandComparison());
    const request = new Request(
      new URL(`/api/${simplePlayerId}/showdown`, "http://host.com"),
      {
        method: "POST",
        body: JSON.stringify({
          another_player_id: "just a string",
        }),
      }
    );
    const result = await subject.handle(request);
    expect(result.status).toEqual(422);
    const body = await result.text();
    expect(body).toEqual("invalid request");
  });

  test("should return 422 with invalid request when player_id is not uuid", async () => {
    const subject = new Controller(new MockHandComparison());
    const request = new Request(
      new URL(`/api/not_a_uuid/showdown`, "http://host.com"),
      {
        method: "POST",
        body: JSON.stringify({
          another_player_id: uuid.v4(),
        }),
      }
    );
    const result = await subject.handle(request);
    expect(result.status).toEqual(422);
    const body = await result.text();
    expect(body).toEqual("invalid request");
  });

  class MockErrorHandComparison extends HandComparison {
    compare(handId: string, anotherHandId: string): GameResult {
      throw new Error("Cannot find hand");
    }
  }

  test("should return 404 when system cannot find hand", async () => {
    const subject = new Controller(new MockErrorHandComparison());
    const request = new Request(
      new URL(`/api/${simplePlayerId}/showdown`, "http://host.com"),
      {
        method: "POST",
        body: JSON.stringify({
          another_player_id: uuid.v4(),
        }),
      }
    );
    const result = await subject.handle(request);
    expect(result.status).toEqual(404);
    const body = await result.text();
    expect(body).toEqual("Hand not found");
  });

  test("should return 200 and win when win", async () => {
    const subject = new Controller(new MockHandComparison());
    const request = new Request(
      new URL(`/api/${simplePlayerId}/showdown`, "http://host.com"),
      {
        method: "POST",
        body: JSON.stringify({
          another_player_id: uuid.v4(),
        }),
      }
    );
    const result = await subject.handle(request);
    expect(result.status).toEqual(200);
    const body = await result.json();
    expect(body["result"]).toEqual("win");
  });

  test("should return 200 and lose when lose", async () => {
    const subject = new Controller(new MockHandComparison(GameResult.Lose));
    const request = new Request(
      new URL(`/api/${simplePlayerId}/showdown`, "http://host.com"),
      {
        method: "POST",
        body: JSON.stringify({
          another_player_id: uuid.v4(),
        }),
      }
    );
    const result = await subject.handle(request);
    expect(result.status).toEqual(200);
    const body = await result.json();
    expect(body["result"]).toEqual("lose");
  });

  test("should return 200 and draw when draw", async () => {
    const subject = new Controller(new MockHandComparison(GameResult.Draw));
    const request = new Request(
      new URL(`/api/${simplePlayerId}/showdown`, "http://host.com"),
      {
        method: "POST",
        body: JSON.stringify({
          another_player_id: uuid.v4(),
        }),
      }
    );
    const result = await subject.handle(request);
    expect(result.status).toEqual(200);
    const body = await result.json();
    expect(body["result"]).toEqual("draw");
  });

  test("alternative: using mock to test - should return 200 and win when win", async () => {
    const handComparison = new HandComparison();
    handComparison.compare = mock(() => GameResult.Win);

    const subject = new Controller(new HandComparison());
    const request = new Request(
      new URL(`/api/${simplePlayerId}/showdown`, "http://host.com"),
      {
        method: "POST",
        body: JSON.stringify({
          another_player_id: uuid.v4(),
        }),
      }
    );
    const result = await subject.handle(request);
    expect(result.status).toEqual(200);
    const body = await result.json();
    expect(body["result"]).toEqual("win");
  });
});
