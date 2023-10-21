
const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://biswajit2329:T1voipAip4RSgv97@cluster0.fw5wwvc.mongodb.net/Chicken?retryWrites=true&w=majority';
const client = new MongoClient(url);
const database='Chicken'


async function dbconnect_product()
{
  let result=await client.connect();
  let db=result.db(database)
  return db.collection('product');
}

module.exports=dbconnect_product
