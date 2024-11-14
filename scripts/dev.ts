import { $, type ShellError } from "bun";
import type { PackageJson } from "type-fest";
import packageJson from "../package.json" with { type: "json" };

if (process.env.NODE_ENV !== "development") {
	console.error("NODE_ENV is not development.");
	process.exit(1);
}

await Promise.all([
	$`bunx lefthook install`,
	$`git config commit.template .gitmessage.txt`,
]);
// main tasks
const repoName: string | undefined = new URL(import.meta.url).href
	.split("/")
	// [..., -3: project root dir, -2: "scripts", -1: "dev.ts"]
	.at(-3);
if (repoName == null) {
	throw new Error("cannot get cwd name");
}

const newPackageJson: PackageJson = {};
// name
if (packageJson.name == null || packageJson.name === "<default>") {
	newPackageJson.name = repoName;
}

await $`bun fmt`;
await $`git add .`;
await $`git commit --amend -m "Initial commit (via bun create)"`.catch(
	(reason: ShellError) => {
		// fatal: You have nothing to amend
		if (reason.exitCode === 128) {
			return;
		}
		throw reason;
	},
);

console.log("To get started developing: edit src/server.ts and `bun start`");
