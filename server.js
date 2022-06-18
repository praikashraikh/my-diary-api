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

app.listen(3000);