const express = require('express')
const app = express();
const {MongoClient} = require('mongodb');
const Mongo = require('mongodb');
const url="mongodb://localhost:27017";
const client= new MongoClient(url);

 async function main(){
     await client.connect();
}

const collection=client.db('internfeb').collection('dashbord');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 7710;
//swagger start
const swaggerUi=require('swagger-ui-express');
const swaggerDocumnet=require('./swagger.json');
const package = require('./package.json')

swaggerDocumnet.info.version = package.version;
app.use('/api-doc',swaggerUi.serve, swaggerUi.setup(swaggerDocumnet))
//swagger end

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
app.use(cors())

app.get('/health',(req,res)=>{
     res.send('Health OK')
})

//Insert the UI
app.post('/addUser',async(req,res)=>{
     await collection.insertOne(req.body);
     res.send('Data Added')
})

//Get user
app.get('/users',async(req,res)=>{
     const output=[];
     let query={};
     if(req.query.city && req.query.role){
          query={
               city:req.query.city,
               role:req.query.role,
               isActive:true
          }
     }
    else if(req.query.city){
          query={
               city:req.query.city,
               isActive:true
          }
     }else if(req.query.role ){
          query={
               role:req.query.role,
               isActive:true
          }
     }else if(req.query.isActive ){
       let isActive=req.query.isActive;
       if(isActive=="false"){
          isActive=false
       }else{
          isActive=true
       }
       query={isActive}
     }else{
          query={}
     }
     const cursor=collection.find(query);
     for await(const data of cursor){
          output.push(data)
     }
     cursor.closed;
     res.send(output)
})

//get perticular user

app.get('/user/:id',async(req,res)=>{
     const output=[];
     let query={_id:new Mongo.ObjectId(req.params.id)}
     const cursor=collection.find(query);
     for await(const data of cursor){
          output.push(data)
     }
     cursor.closed;
     res.send(output)
})

//update user
app.put('/updateUser',async(req,res)=>{
     await collection.updateOne(
          {_id:new Mongo.ObjectId(req.body.id)},
          {
               $set:{
                   name: req.body.name,
                   city: req.body.city,
                   phone: req.body.phone,
                   role: req.body.role,
                   isActive: true
               }
          }
     )
     res.send('Record Update')
})

// Delete User (hard delete)
app.delete('/deleteUser',async(req,res)=>{
     await collection.deleteOne({
          _id:new Mongo.ObjectId(req.body._id)
     })
     res.send('User Update')
})

//softDelete user
app.put('/deactiveUser',async(req,res)=>{
     await collection.updateOne(
          {_id:new Mongo.ObjectId(req.body._id)},
          {
               $set:{
                   isActive: false
               }
          }
     )
     res.send('User Deactivated')
})

//softDelete user
app.put('/activeUser',async(req,res)=>{
     await collection.updateOne(
          {_id:new Mongo.ObjectId(req.body._id)},
          {
               $set:{
                   isActive: true
               }
          }
     )
     res.send('User Activated')
})

app.listen(port,()=>{
     main()
     console.log(`Running on port ${port}`)
})
