import app from "./app.js";
import { env } from "./config/env.js";
import { connectDatabase } from "./config/database.js";
import { startAbaListener } from "./services/aba/abaListener.js";
import { startBotPaymentListener } from "./services/aba/botListener.js";

try {
	await connectDatabase();
	const stopAbaListener = await startAbaListener();
	const stopBotPaymentListener = await startBotPaymentListener();
	app.listen(env.port, "0.0.0.0", () => console.log(`API listening on port ${env.port}`));
	process.once("SIGINT", async () => { await stopAbaListener(); await stopBotPaymentListener(); process.exit(0); });
	process.once("SIGTERM", async () => { await stopAbaListener(); await stopBotPaymentListener(); process.exit(0); });
} catch (error) {
	console.error("Unable to start API. Check MongoDB URI and Atlas Network Access.");
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
}