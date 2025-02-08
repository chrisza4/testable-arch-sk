import { describe, test, expect, mock } from "bun:test";
import { HandComparison } from "./model";
import { Database } from "bun:sqlite";
import { HandData } from "./data";

describe("HandComparison", () => {
  test("Should throw Hand not found when hand does not exists in data", () => {
    const handData = new HandData(new Database(":memory:"));
    handData.getHandById = mock(() => {
      throw new Error("Object not found");
    });

    const subject = new HandComparison(handData);
    expect(() => subject.compare("123", "456")).toThrowError(
      "Cannot find hand"
    );
  });
});
