/* Write controller and test using DI technique
Spec:
  - Check if `api/{hand_id}/showdown` is called
    - Return 501 status code with simple string “unsupported” user called other route of API
  - Check if we have body with json format with `another_hand_id`
    - Return 422 invalid request with simple string “invalid request” if it is not
  - Check if `hand_id` and `another_hand_id` is uuid
    - Return 422 invalid request with simple string “invalid request” if it is not
  - Send this to compare in HandComparison class
  - Check if compare throw error with message "Cannot find hand"
    - Return 404 with simple string "hand not found"
  - Success: Return
    {
      result: "win" or "lose" or "draw"
    }
*/

import type { GameResult } from "../src/poker/hand";

// In controller.ts
export class Controller {
  private handComparison: HandComparison;
  constructor(handComparison: HandComparison) {
    this.handComparison = handComparison;
  }

  async handle(req: Request): Promise<Response> {
    throw new Error("Not implemented");
  }
}

// In model.ts
export class HandComparison {
  compare(handId: string, anotherHandId: string): GameResult {
    throw new Error("Not implemented yet");
  }
}
