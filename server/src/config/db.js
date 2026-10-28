import mongoose from "mongoose";

// Keep one in-flight/connected promise per process. On serverless platforms
// (Vercel) the module is reused between invocations, so this avoids opening a
// new connection pool on every request.
const state = (globalThis.__kanchanDb ??= { promise: null });

export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri)
    throw new Error(
      "MONGODB_URI is required. Copy server/.env.example to server/.env and configure it.",
    );

  // 1 = connected, 2 = connecting
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (mongoose.connection.readyState !== 2) state.promise = null;

  if (!state.promise) {
    state.promise = mongoose
      .connect(uri, { serverSelectionTimeoutMS: 10000, maxPoolSize: 10 })
      .then(() => mongoose.connection)
      .catch((error) => {
        state.promise = null; // allow the next request to retry
        throw error;
      });
  }
  return state.promise;
}
