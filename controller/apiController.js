let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let db;
let mongoUrl = process.env.mongoUrl;

function dbconnect(){
     MongoClient.connect(mongoUrl,(err,client)=>{
          if(err) console.log(`Error while connecting to mongo`);
          db= client.db('internfeb');
     })
}

async function getData(colName,query) {
     return await db.collection(colName).find(query).toArray()
}

async function getDatawithsort(colName,query,sort) {
     return await db.collection(colName).find(query).sort(sort).toArray()
}

async function getDatawithsortlimit(colName,query,sort,skip,limit) {
     return await db.collection(colName).find(query).sort(sort).skip(skip).limit(limit).toArray()
}

async function postData(colName,data) {
     return await db.collection(colName).insert(data)
}

async function updateData(colName,condition,data) {
     return await db.collection(colName).update(condition,data)
}

async function deleteData(colName,condition) {
     return await db.collection(colName).remove(condition)
}

module.exports = {
     dbconnect,
     getData,
     getDatawithsort,
     getDatawithsortlimit,
     postData,
     updateData,
     deleteData
}


// # Upadate

// db.user.update(
//      {Condition},
//      {Values}
//  )
 
//  db.user.update(
//      {"_id":3},
//      {
//          $set:{                                
//              "addrss":"128 viman nagar"
//              "city":"pune"
//          }
//      }  
//  )