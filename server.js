const express = require("express");
const app = express();

const { MongoClient } = require('mongodb');
const connectionString = 'mongodb+srv://test:test@cluster0.ggrr9.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(connectionString);

// Database Name
const dbName = 'MyDiaries';

async function getDiaries(req, res) {
  // Use connect method to connect to the server
  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('Diaries');
  const result = await collection.find({}).toArray();
  return res.json(result);
}

app.get('/diaries', getDiaries);

app.listen(3000);