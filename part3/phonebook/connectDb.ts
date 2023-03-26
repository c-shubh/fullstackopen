import mongoose, { Error } from "mongoose";

export default async function connectDb() {
  mongoose.set("strictQuery", false);
  const url = process.env.MONGO_URL;

  try {
    const connection = await mongoose.connect(url as string);
    if (connection) {
      console.log("connected to MongoDB");
    }
  } catch (error) {
    console.log("error connecting to MongoDB:", (error as Error).message);
  }
}
