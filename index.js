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

app.patch("/foundType", async (req, res) => {
  let result = await dbconnect_product();
  let data = await result.find().toArray();

  let type = req.body.type;
  let page = req.body.page;
  let low = page * 12;
  let high = (page + 1) * 12;

  let ans = [];
  if (type.length != 0) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].product_type == type) {
        ans.push(data[i]);
      }
    }
  } else {
    ans = data;
  }


  obj = {};
  if (page == 0) obj["prev"] = false;
  else obj["prev"] = true;

  if (ans.length > high) obj["next"] = true;
  else obj["next"] = false;

  let arr = [];
  for (let i = low; i < ans.length && i < high; i++) {
    arr.push(ans[i]);
  }

  nums = {};
  nums["data"] = arr;

  pagination = {};
  pagination["pagination"] = obj;

  ans = [];
  ans.push(nums);
  ans.push(pagination);
  res.send(ans);
});

app.post("/uploads", async (req, res) => {
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
