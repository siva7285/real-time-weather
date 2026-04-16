require('dotenv').config();
const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/";

async function ActiveUserDetails() {
    const client = new MongoClient(url);
    try {
        await client.connect();

        const db = client.db('WeatherSenseDB');
        const col = db.collection('ActiveUsers');

        const result = await col.find({}).toArray();

        if (result && result.length > 0) {
            const lastUser = result[result.length - 1];
            const { _id, ...userData } = lastUser; // remove _id safely
            return userData;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error retrieving active user details:', error);
        throw error;
    } finally {
        await client.close();
    }
}

module.exports = { ActiveUserDetails };
