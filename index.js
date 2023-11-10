const mongoose = require("mongoose");
let express = require("express");
let cors = require("cors");
var ObjectID = require("bson-objectid");
let app = express();
app.use(express.json({ limit: "50mb" }));
app.use(cors());
let bcrypt = require("bcryptjs");

let Jwt = require("jsonwebtoken");
const jwtKey = "Chicken";

let dbconnect_product = require("./product");
let dbconnect_user = require("./user");
let dbconnect_order=require('./order')


app.post("/pushorder",async(req,res)=>{
  let data=await dbconnect_order();
  let result = await data.insertOne(req.body);
  if(result.acknowledged==true) res.send({status:200});
  else res.send({status:401})
})

app.patch("/getproduct", async (req, res) => {
  let result = await dbconnect_product();
  let data = await result.find().toArray();
  let nums = req.body.product_ids;
  let ans = [];
  console.log(nums);
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (data[j]._id == nums[i]) {
        ans.push(data[j]);
      }
    }
  }
  res.send(ans);
});

app.patch("/login", async (req, resp) => {
  if (req.body.email && req.body.password) {
    let data = await dbconnect_user();
    let password = req.body.password;

    let user = await data.findOne({
      email: req.body.email,
    });
    if (user == null) resp.send("user no found");
    else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch == false) {
        resp.send("user no found");
      }
      delete user.password;
      if (user) {
        Jwt.sign({ user }, jwtKey, (error, token) => {
          if (error) {
            resp.send({ message: "We find some error" });
          }
          resp.send({ user, auth: token });
        });
      } else {
        resp.send("user no found");
      }
    }
  } else {
    resp.send("user not found");
  }
});

app.post("/register", async (req, resp) => {
  let data = await dbconnect_user();
  let password = req.body.password;
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  let result = await data.insertOne({
    name: req.body.name,
    email: req.body.email,
    phone:req.body.phone,
    password: passwordHash,
  });
  delete req.body.password;
  let user = req.body;
  if (result.acknowledged) {
    Jwt.sign({ user }, jwtKey, (error, token) => {
      if (error) {
        resp.send({ message: "We find some error" });
      }
      resp.send({ user, auth: token });
    });
  } else {
    resp.send("user no found");
  }
});

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
