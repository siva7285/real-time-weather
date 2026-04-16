require('dotenv').config();
const { MongoClient } = require("mongodb");

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/";

async function LoginCred(Username, Password) {
    const client = new MongoClient(url);
    try {
        await client.connect();

        const db = client.db('WeatherSenseDB');
        const col = db.collection('LoginAuthentication');

        const query = { 'Username': Username, 'Password': Password };
        const result = await col.findOne(query);

        if (result) {
            return 1;
        } else {
            return 0;
        }
    } catch (err) {
        console.error('LoginCred error:', err);
        return 0;
    } finally {
        await client.close();
    }
}


module.exports = { LoginCred };
