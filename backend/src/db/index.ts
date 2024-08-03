import mongoose from "mongoose";
import { DE_NAME } from "../constant";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE_URL}/${DE_NAME}/?retryWrites=true&w=majority`
    );
    console.log("connected to DB", connectionInstance.connection.port);
  } catch (error) {
    console.log("failed to connect to DB:", error);
    process.exit(-1);
  }
};

export { connectDB };
