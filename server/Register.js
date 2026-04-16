require('dotenv').config();
const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/";

async function RegisterCred(Username, Password, Name, City) {
    const client = new MongoClient(url);
    try {
        await client.connect();

        const db = client.db('WeatherSenseDB');
        const col = db.collection('LoginAuthentication');

        // Check for existing user by Username only
        const existing = await col.findOne({ 'Username': Username });

        if (existing) {
            return 1; // user already exists
        } else {
            const insertResult = await col.insertOne({
                'Username': Username,
                'Password': Password,
                'Name': Name,
                'City': City
            });
            if (insertResult.acknowledged) {
                return 2; // created successfully
            } else {
                return 0; // insert failed
            }
        }
    } catch (err) {
        console.error('RegisterCred error:', err);
        return 0;
    } finally {
        await client.close();
    }
}


module.exports = { RegisterCred };
