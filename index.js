let express = require("express");
const cors = require('cors');
let app = express();
app.use(cors());
let dbconnect_chicken=require('./connection/Chicken')


app.post("/uploads",async (req, res) => {
    let data = await dbconnect_chicken();
    let result = await data.insertOne(req.body);
    if(result.acknowledged==true) res.send({status:200,'data':req.body});
    else res.send({'status':198})
});
  
app.get("/", async (req, res) => {
  let data = await dbconnect_chicken();
  let result = await data.find().toArray();
  res.send(result);
});


app.listen(5000);