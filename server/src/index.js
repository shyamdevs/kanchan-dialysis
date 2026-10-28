import "dotenv/config";
import app, { configProblem } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { bootstrapAdmin } from "./config/bootstrap.js";

const port = Number(process.env.PORT || 5000);

// On Vercel the platform imports this module and calls the exported app for
// each request (the database is connected lazily inside the app), so we must
// not call listen() or exit the process there.
if (!process.env.VERCEL) {
  const problem = configProblem();
  if (problem) {
    console.error(`[api] ${problem}`);
    process.exit(1);
  }

  connectDatabase()
    .then(() => bootstrapAdmin({ strict: true }))
    .then(() =>
      app.listen(port, () =>
        console.log(`[api] Kanchan Dialysis CMS API listening on port ${port}.`),
      ),
    )
    .catch((error) => {
      console.error(`[api] Startup failed: ${error.message}`);
      process.exit(1);
    });
}

export default app;
