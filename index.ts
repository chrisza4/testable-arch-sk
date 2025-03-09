import { prinableResult } from "./src/printer";
import { Reader } from "./src/reader";

// The thinner this is, the better
function main() {
  const reader = new Reader("./test_assets/sample.json");
  const hands = reader.read();

  // We don't need to re-test console.log
  console.log(prinableResult(hands[0].compare(hands[1])));
}

main();
