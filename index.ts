import { prinableResult } from "./src/printer";
import { Reader } from "./src/reader";

function main() {
  const reader = new Reader("./test_assets/sample.json");
  const hands = reader.read();
  console.log(prinableResult(hands[0].compare(hands[1])));
}

main();
