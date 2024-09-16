import { swaggerUI } from "@hono/swagger-ui";
import { OpenAPIHono, createRoute, z } from "@hono/zod-openapi";

const app = new OpenAPIHono();

app.openapi(
	createRoute({
		method: "get",
		path: "/hello",
		responses: {
			200: {
				description: "Respond a message",
				content: {
					"application/json": {
						schema: z.object({
							message: z.string(),
						}),
					},
				},
			},
		},
	}),
	(c) => {
		return c.json({
			message: "hello",
			hoge: "hoge",
		});
	},
);

// Use the middleware to serve Swagger UI at /ui
app.get("/ui", swaggerUI({ url: "/doc" }));

app.doc("/doc", {
	info: {
		title: "Hono Template API",
		version: "v1",
	},
	openapi: "3.1.0",
});

export default app;
