const { MongoClient } = require('mongodb');
const connectionString = 'mongodb+srv://test:test@cluster0.ggrr9.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(connectionString);

class MongoService {
    async _connect() {
        await client.connect();
    }

    async find(collectionName, query) {
        const db = client.db('MyDiaries');
        const collection = db.collection(collectionName);
        console.log(`Querying ${collectionName}:`, query);
        const result = await collection.find(query).toArray();

        console.log("Result: ", result);
        return result;
    }

    async findOne(collectionName, query) {
        const db = client.db('MyDiaries');
        const collection = db.collection(collectionName);
        console.log(`Querying ${collectionName}:`, JSON.stringify(query));
        const result = await collection.findOne(query);

        console.log("Result: ", result);
        return result;
    }

    async findOne(collectionName, query) {
        const db = client.db('MyDiaries');
        const collection = db.collection(collectionName);
        console.log(`Querying ${collectionName}: ${query}`);
        const result = await collection.findOne(query);

        console.log("Result: ", result);
        return result;
    }

    async remove(collectionName, query) {
        const db = client.db('MyDiaries');
        const collection = db.collection(collectionName);
        console.log(`Removing from ${collectionName}: ${query}`);
        const result = await collection.deleteOne(query);

        console.log("Result: ", result);
        return result;
    }

    async insert(collectionName, query) {
        const db = client.db('MyDiaries');
        const collection = db.collection(collectionName);
        console.log(`Inserting into ${collectionName}: ${query}`);
        const result = await collection.insert(query);

        console.log("Result: ", result);
        return result;
    }

    async update(collectionName, selectQuery, updateQuery) {
        const db = client.db('MyDiaries');
        const collection = db.collection(collectionName);
        console.log('Select Query: ', selectQuery);
        console.log('Upate query: ', updateQuery);
        const result = await collection.updateOne(selectQuery, updateQuery);

        console.log("Result: ", result);
        return result;
    }
}

module.exports = new MongoService();