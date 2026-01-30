import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) {
    console.log("✅ DB already connected:", mongoose.connection.name);
    return;
  }

  console.log("🟡 Connecting to MongoDB...");
  console.log("🟡 MONGODB_URI:", process.env.MONGODB_URI);

  await mongoose.connect(process.env.MONGODB_URI);

  isConnected = true;

  console.log("🟢 DB connected:", mongoose.connection.name);
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
