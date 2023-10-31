
const { MongoClient } = require('mongodb');
const url = 'mongodb+srv://biswajit2329:T1voipAip4RSgv97@cluster0.fw5wwvc.mongodb.net/Chicken?retryWrites=true&w=majority';
const client = new MongoClient(url);
const database='Chicken'


async function dbconnect_user()
{
  let result=await client.connect();
  let db=result.db(database)
  return db.collection('user');
}


module.exports=dbconnect_user