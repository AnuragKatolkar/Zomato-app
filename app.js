let express = require('express');
let app = express();
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let dotenv= require('dotenv');
dotenv.config()
let mongoUrl = process.env.mongoUrl;
let bodyParser = require('body-parser');
let cors = require('cors');
let port = process.env.PORT;
let db;
let authKey= process.env.AuthKey

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())

let {getData,getDatawithsort,getDatawithsortlimit,postData} = require('./controller/apiController')

function auth(key){
     if(key == authKey){
          return true
     }else{
          return false
     }
}

// function getData(colName,query){
//      if(colName && query){
//           db.collection(colName).find(query).toArray((err,data)=>{
//                if(err) throw err;
//                return data
//           })
//      }else{
//         return 'Data Missing'
//      }
// }

//get heart beat
app.get('/',(req,res)=>{
     res.status(200).send('Health ok')
})

// list of city
app.get('/location',(req,res)=>{
     // let key = req.query.key;
     let key = req.header('x-basic-token')
    if(auth(key)){                      //(key == authKey)
     db.collection('location').find().toArray((err,data)=>{
          if(err) throw err;
          res.status(200).send(data)
     })
    }else{
     res.status(401).send('Not Authenticated call')
    }
})

//List of restaurants (imp)
app.get('/restaurants',(req,res)=>{
     let query = {};
     let stateId= Number(req.query.stateId)
     let mealId = Number(req.query.mealId)
     if(stateId && mealId){
          query = {
               state_id:stateId,
               "mealTypes.mealtype_id":mealId
          }
     }else if(stateId){
          query={state_id:stateId}
     }else if(mealId){
          query={"mealTypes.mealtype_id":mealId}
     }else{
          query= {}
     }
     db.collection('restaurants').find(query).toArray((err,data)=>{
          res.status(200).send(data)
     })
})

// List of meals

app.get('/meals',async (req,res)=>{
     let query = {}
     let collection = 'mealType'
     let output = await getData(db,collection,query)
     res.send(output)
})

// Filters
app.get('/filter/:mealID',async (req,res)=>{    //  mealId is compulsory
      let query = {}
      let collection = 'restaurants'
      let sort = {cost:1}
      let skip=0;
      let limit=100000000;
      let mealID=Number(req.params.mealID);
      let cuisineId = Number(req.query.cuisineId)
      //cost
      let hcost=Number(req.query.hcost);
      let lcost=Number(req.query.lcost)

     if(req.query.skip && req.query.limit){
          skip=Number(req.query.skip),
          limit=Number(req.query.limit)
     }

      if(req.query.sort){
          sort={cost:req.query.sort}
      }

      if(cuisineId && hcost && lcost){
          query={
               "mealTypes.mealtype_id":mealID,
               "cuisines.cuisine_id":cuisineId,
               $and:[{cost:{$gt:lcost,$lt:hcost}}]
          }
      } else if(cuisineId){
          query={
               "mealTypes.mealtype_id":mealID,
               "cuisines.cuisine_id":cuisineId
          }
      }else if(hcost && lcost){
          query={
               "mealTypes.mealtype_id":mealID,
               $and:[{cost:{$gt:lcost,$lt:hcost}}]
          }
      }

      let output = await getDatawithsortlimit(db,collection,query,sort,skip,limit)    //apiController.js
      res.send(output)
})

// details
app.get('/details/:id',async(req,res)=>{
     let _id=mongo.ObjectId(req.params.id);
     let query = {
          _id:_id
     }
     let collection = 'restaurants'
     let output = await getData(db,collection,query)
     res.send(output)
})

//menu wrt to restaurants
app.get('/menu/:id',async (req,res)=>{
     let id =Number(req.params.id)
     let query = {restaurant_id:id}
     let collection = 'menu'
     let output = await getData(db,collection,query)
     res.send(output)
})



//order
app.get('/orders',async (req,res)=>{
     let query ={}
     if(req.query.email){
          query={email:req.query.email}
     }
     let collection='orders'
     let output = await getData(db,collection,query)
     res.send(output)


})

//placeOrders

app.post('/placeOrder',async (req,res)=>{
     let data = req.body;
     let collection='orders'
     let response = await postData(db,collection,data)
     res.send(response)

})

//menu detalis {"id":[1,5,6]}
app.post('/menuDetails',async(req,res)=>{
     if(Array.isArray(req.body.id)){
          let query ={menu_id:{$in:req.body.id}}
          let collection='menu'
          let output = await getData(db,collection,query)
          res.send(output)
     }else{
          res.send('Plese pass data as array like {"id":[1,5,6]}')
     }
})


MongoClient.connect(mongoUrl,(err,client)=>{
     if(err) console.log(`Error while connecting to mongo`);
     db= client.db('internfeb');
     app.listen(port,()=>{
          console.log(`Running on tne port ${port}`)
     })
})