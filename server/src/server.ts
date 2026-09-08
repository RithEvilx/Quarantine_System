import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";

try {
	await connectDatabase();
	app.listen(env.port, "0.0.0.0", () => console.log(`API listening on port ${env.port}`));
} catch (error) {
	console.error("Unable to start API. Check MongoDB URI and Atlas Network Access.");
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
}