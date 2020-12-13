const express = require("express");
const cors = require("cors");
const router = require("./routes/router");
require("dotenv").config();
const app = express();
const db = require("./helpers/dbConnections");
const port = process.env.PORT;

app.use(cors());
app.use("/api", router);
app.use(express.static("public"));

async function startService(){
  const dbConnection = await db();
  if(dbConnection === "connected"){
      app.listen(port,() =>{
        console.log("db",dbConnection);
        console.log(`server started at port ${port}`)
      })
  }
  else{
    console.log("db connection error",dbConnection);
  }
}
startService();