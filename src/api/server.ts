import * as uuid from "uuid";
Bun.serve({
  async fetch(req) {
    return new Controller().handle(req);
  },
  error(e) {
    return new Response(`Error:${e.message}`, {
      status: 500,
    });
  },
  port: 3000,
});

class Controller {
  async handle(req: Request): Promise<Response> {
    const url = new URL(req.url);
    const match = url.pathname.match("/api/(.+)/showdown");
    const method = req.method;
    if (!match || method !== "POST") {
      throw new Error("Not in lesson");
    }
    const handId = match[1];
    const body = await req.json();
    const anotherHandId = body["another_player_id"];
    if (!(uuid.validate(handId) && uuid.validate(anotherHandId))) {
      return new Response("Not valid uuid");
    }
    // Just sample code
    Model(handId, anotherHandId);
    return new Response("Here");
  }
}

console.log("Start Server");
