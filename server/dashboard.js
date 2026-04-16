require('dotenv').config();
const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/";

async function ActiveUsers(Username, Password) {
    const client = new MongoClient(url);
    try {
        await client.connect();

        const db = client.db('WeatherSenseDB');
        const col1 = db.collection('LoginAuthentication');
        const col2 = db.collection('ActiveUsers');

        const query = { 'Username': Username, 'Password': Password };
        const result = await col1.findOne(query);

        if (!result) {
            return 0;
        }

        const { _id, ...userData } = result; // remove _id before insert
        await col2.insertOne(userData);

        return 1;
    } catch (err) {
        console.error('ActiveUsers error:', err);
        return 0;
    } finally {
        await client.close();
    }
}


module.exports = { ActiveUsers };
