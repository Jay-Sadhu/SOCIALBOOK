require("dotenv").config();
const cors = require("cors");
const cookiParser = require("cookie-parser")
const express = require("express");

const router = require("./routes/router");

const app = express();

app.use(express.json());
app.use(cookiParser());
app.use(cors());
app.use(router);


// try connecting to the database
// ONLY if the connection is successful then app.listen()
require("./db/conn");
const port = 8010;
app.listen(port,()=>{
    console.log(`server start at port no : ${port}`);
})