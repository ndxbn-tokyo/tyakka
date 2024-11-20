#

## Install

`bun i tyakka`

## Usage

```typescript
import type {Hono} from "hono";
import {Factory} from "tyakka";

const app: Hono = await new Factory().create();

export default app;
```
