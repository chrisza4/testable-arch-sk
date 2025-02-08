import { Controller } from "./controller";
import { HandData } from "./data";
import { HandComparison } from "./model";
import { Database } from "bun:sqlite";

Bun.serve({
  async fetch(req) {
    return new Controller(
      new HandComparison(new HandData(new Database("cards.sqlite")))
    ).handle(req);
  },
  error(e) {
    return new Response(`Error:${e.message}`, {
      status: 500,
    });
  },
  port: 3000,
});

console.log("Start Server");
