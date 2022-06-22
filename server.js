const express = require("express");
const res = require("express/lib/response");
const app = express();

const { MongoClient } = require('mongodb');
const connectionString = 'mongodb+srv://test:test@cluster0.ggrr9.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(connectionString);

// Database Name
const dbName = 'MyDiaries';

async function getDiaries(req, res) {
  const searchParam = req.query.search;
  const abc = req.query.test;
  console.log("Search params found: ", searchParam);
  console.log("abc: ", abc);

  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('Diaries');
  const result = await collection.find({ "title": searchParam }).toArray();
  return res.json(result);
}

app.get('/diaries', getDiaries);
  
async function getDiary(req, res) {
  const id = req.params.id;
  const query = { _id: Number(id) };
  console.log("Query: ", query);

  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('Diaries');
  const result = await collection.find(query).toArray();
  return res.json(result);
}

app.get('/diary/:id', getDiary);


app.use(express.json());
// post, patch

async function postDiary(req, res) {
  const newDiary = req.body;
  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('Diaries');
  console.log("Got from postman: ", newDiary);
  const result = await collection.insertOne(newDiary);
  return res.json(result);
}
//POST --> CREATE
app.post('/diary', postDiary);


// PATCH --> UPDATE (HW PATCH VS PUT)
async function postDiary(req, res) {
  const _id = req.params.id;
  const newDiary = req.body;
  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('Diaries');
  console.log("PATCH: Got from postman: ", newDiary);
  console.log("PATCH: Got from postman: ", { _id: Number(_id)});
  console.log("PATCH: Got from postman: ", { $set: newDiary });
  const result = await collection.updateOne({ _id: Number(_id) }, { $set: newDiary });
  return res.json(result);
}
//PATCH --> UPDATE
app.patch('/diary/:id', postDiary);

app.listen(3000);

/**
 * Homework
 * 1. PUT VS PATCH
 * 
 * 2. Create a Library Database Book collection
 *      and add get/getbyId/post/patch apis
 * 
 * 3. Read about JWT token
 */