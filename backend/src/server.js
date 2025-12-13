import express from "express";
import cors from "cors";
import { ENV } from "./lib/env.js";
import connectDB from "./lib/db.js";
import authrouter from "./routes/authRoutes.js";

const app = express();
const PORT = ENV.PORT;
app.use(cors());
app.use(express.json());


app.use('/api/auth',authrouter);

app.get('/', (req, res) => {
  res.send("API is running...");
}   );

const startServer = async () => {
 await connectDB();
  app.listen(PORT, () => {
    console.log("Server is listening on PORT:", PORT);
  });
};
startServer();
