
const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://biswajit2329:T1voipAip4RSgv97@cluster0.fw5wwvc.mongodb.net/e-comm?retryWrites=true&w=majority';
const client = new MongoClient(url);
const database='e-comm'


async function dbconnect_Reviews()
{
  let result=await client.connect();
  let db=result.db(database)
  return db.collection('Reviews');
}
module.exports=dbconnect_Reviews
