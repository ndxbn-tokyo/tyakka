import { Glob } from "bun";
import type { ServerOptions } from "honox/server";
import { createApp } from "honox/server/base";

type RouteList =
	| ServerOptions["ROUTES"]
	| ServerOptions["MIDDLEWARE"]
	| ServerOptions["RENDERER"]
	| ServerOptions["ERROR"]
	| ServerOptions["NOT_FOUND"];

async function globImport<R extends RouteList[keyof RouteList]>(
	patterns: string[],
): Promise<R> {
	const routeList: R = {} as R;
	for (const pattern of patterns) {
		for await (const filePath of new Glob(pattern).scan({
			cwd: `${process.cwd()}/src/routes`,
			absolute: true,
		})) {
			// filePath e.g.:
			// Linux / Mac: "/path/to/repo/my_app/src/routes/index.tsx"
			// Windows: "C:\path\to\repo\my_app\src\routes\index.tsx"
			const handler: R[keyof R] = await import(filePath);
			const webPath = filePath
				.replace(process.cwd(), "") // remove path to project root
				.replaceAll("\\", "/") // follow Windows separator
				.replace("/src/routes", ""); // make to document root
			routeList[webPath] = handler;
		}
	}
	return routeList;
}

export class Factory {
	public static create() {
		return new Factory().create();
	}

	public async create(options: ServerOptions = {}) {
		return createApp({
			root: options.root ?? "",
			trailingSlash: true,
			// biome-ignore lint/style/useNamingConvention: honox
			RENDERER:
				options.RENDERER ?? (await globImport(["**/_renderer.(ts|tsx)"])),
			// biome-ignore lint/style/useNamingConvention: honox
			ROUTES:
				options.ROUTES ??
				(await globImport([
					"**/!(_*|$*|*.test|*.spec).(ts|tsx|md|mdx)",
					".well-known/**/!(_*|$*|*.test|*.spec).(ts|tsx|md|mdx)",
				])),
			// biome-ignore lint/style/useNamingConvention: honox
			NOT_FOUND: options.NOT_FOUND ?? (await globImport(["**/_404.(ts|tsx)"])),
			// biome-ignore lint/style/useNamingConvention: honox
			ERROR: options.ERROR ?? (await globImport(["**/_error.(ts|tsx)"])),
			// biome-ignore lint/style/useNamingConvention: honox
			MIDDLEWARE:
				options.MIDDLEWARE ?? (await globImport(["**/_middleware.(ts|tsx)"])),
		});
	}
}
