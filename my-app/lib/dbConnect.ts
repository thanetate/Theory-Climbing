import mongoose from "mongoose";

async function dbConnect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    if (error instanceof Error) {
      console.error("MongoDB connection error:", error.message);
      throw new Error(`Connection failed! ${error.message}`);
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Connection failed due to an unexpected error");
    }
  }
}

export default dbConnect;
