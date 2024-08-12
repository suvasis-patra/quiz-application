import mongoose from "mongoose";
import { DB_NAME } from "../constant";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE_URL}/${DB_NAME}`
    );
    console.log("connected to DB", connectionInstance.connection.port);
  } catch (error) {
    console.log("failed to connect to DB:", error);
    process.exit(-1);
  }
};

export { connectDB };
