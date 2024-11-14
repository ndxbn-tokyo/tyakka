import { expect, test } from "bun:test";
import { main } from "./index.ts";

test("main test", async () => {
	const hello = await main();
	expect(hello).toBe("hello, bun world!");
});
