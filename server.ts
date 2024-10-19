import express from "express";
import cors from "cors";
import bodyParser = require("body-parser");
import * as dotenv from "dotenv"
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running on https://localhost:${PORT}`)
},)