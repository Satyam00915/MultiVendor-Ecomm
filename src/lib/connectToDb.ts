import mongoose from "mongoose";

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDb() {
  const MONGO_URI = process.env.MONGO_URI;
  console.log(MONGO_URI);
  if (!MONGO_URI) {
    throw new Error("DB Error");
  }
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI)
      .then((conn) => conn.connection);
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    cached.promise = null;
    console.log(error);
    throw error;
  }
}

export default connectToDb;
