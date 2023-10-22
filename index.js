const mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
var ObjectID = require("bson-objectid");
let app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
// const multer = require('multer');


let dbconnect_product = require("./product");

// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

//Reviews section

app.post("/uploads",async (req, res) => {
  let data = await dbconnect_product();
  let result = await data.insertOne(req.body);
  res.send(req.body);
});

app.get("/", async (req, res) => {
  let data = await dbconnect_product();
  let result = await data.find().toArray();
  res.send(result);
});



app.listen(5000);
