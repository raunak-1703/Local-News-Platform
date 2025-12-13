import express from "express";
import cors from "cors";
import { ENV } from "./lib/env.js";
import connectDB from "./lib/db.js";
import { connect } from "mongoose";

const app = express();
const PORT = ENV.PORT;
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({success:true,message:'Api is running fine'})
})

const startServer = async () => {
 await connectDB();
  app.listen(PORT, () => {
    console.log("Server is listening on PORT:", PORT);
  });
};
startServer();
