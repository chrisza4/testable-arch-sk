import { Controller } from "./controller";
import { HandComparison } from "./model";

Bun.serve({
  async fetch(req) {
    return new Controller(new HandComparison()).handle(req);
  },
  error(e) {
    return new Response(`Error:${e.message}`, {
      status: 500,
    });
  },
  port: 3000,
});

console.log("Start Server");
