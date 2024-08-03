import { app } from "./app";
import { connectDB } from "./db";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () =>
      console.log(`server is running at ${process.env.PORT}`)
    );
  })
  .catch((e) => console.log("Failed to connect to db", e));
