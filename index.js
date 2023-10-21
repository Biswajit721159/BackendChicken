const mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
var ObjectID = require("bson-objectid");
let app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());



let dbconnect_chicken = require("./connection/Chicken");

mongoose.connect("mongodb+srv://biswajit2329:T1voipAip4RSgv97@cluster0.fw5wwvc.mongodb.net/Chicken?retryWrites=true&w=majority");


app.post("/uploads",verifytoken,async (req, res) => {
  let data = await dbconnect_chicken();
  let result = await data.insertOne(req.body);
  res.send(req.body);
});


app.get("/", async (req, res) => {
  let data = await dbconnect_chicken();
  let result = await data.find().toArray();
  res.send(result);
});

app.listen(5000);
