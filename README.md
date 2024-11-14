#
[![Bun](https://img.shields.io/badge/Bun-000?logo=bun&logoColor=fff)](https://bun.sh/)

[![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)
[![Linted with Biome](https://img.shields.io/badge/Linted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

This project is created by `bun create ndxbn/bun`.

- TypeScript config is based on "strictest"
- Dockerfile for production, docker-compose for development
- entrypoint files
  - [index.ts](./src/index.ts): `import from "THIS_REPO"` from outside
  - [cli.ts](src/cli.ts): `bun cli`
  - [server.ts](src/server.ts): `bun start`

## Requirements

- [Bun](https://bun.sh/)
- [Docker](https://docker.com/) (OPTIONAL)

## Install, Run

```bash
# install modules
bun install
# prepare development environment
bun dev
# run main script
bun start
```

## Testing

```bash
bun test
```

## use Docker for Optional Somethings

- startup Middlewares
- [lint GitHub Action](./.github/lint.compose.yaml): do `cd .github` before run it
