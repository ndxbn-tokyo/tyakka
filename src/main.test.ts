import { describe, expect, it } from "bun:test";
import { showRoutes } from "hono/dev";
import { Factory } from "./index.ts";

describe("filesystem routing", async () => {
	const app = await Factory.create();
	showRoutes(app);

	it("/api/v1", async () => {
		const res = await app.request("/api/v1/");
		expect(res.status).toBe(200);
		expect(await res.text()).toBe("Hello API v1 root!");
	});
	it("/api/v1/", async () => {
		const res = await app.request("/api/v1/");
		expect(res.status).toBe(200);
		expect(await res.text()).toBe("Hello API v1 root!");
	});
	it("/api/NOT_FOUND", async () => {
		const res = await app.request("/api/v1/not-found");
		expect(res.status).toBe(404);
		expect(await res.text()).toBe("Not Found in API");
	});
});
