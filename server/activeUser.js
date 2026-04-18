require('dotenv').config();
const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/";

async function ActiveUserDetails(Username) {
    const client = new MongoClient(url);
    try {
        await client.connect();

        const db = client.db('WeatherSenseDB');
        const col = db.collection('ActiveUsers');

        // Always query by Username when available; sort by _id desc to get most recent login
        const query = Username ? { Username: Username } : {};
        const lastUser = await col.findOne(query, { sort: { _id: -1 } });

        if (lastUser) {
            const { _id, ...userData } = lastUser;
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
