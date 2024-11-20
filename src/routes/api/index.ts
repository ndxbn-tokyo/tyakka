import { Hono } from "hono";

const app = new Hono();
app.get("/v1/", (c) => c.text("Hello API v1 root!"));

// noinspection JSUnusedGlobalSymbols
export default app;
