import type { NotFoundHandler } from 'hono'

const handler: NotFoundHandler = (c) => {
	return c.render("Not Found in API");
};

export default handler;
