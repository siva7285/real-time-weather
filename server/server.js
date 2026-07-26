const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const { LoginCred } = require('./login');
const { RegisterCred } = require('./Register');
const { ActiveUsers } = require('./dashboard');
const { ActiveUserDetails } = require('./activeUser');
const { FetchAPIdata } = require('./weatherAPI');

app.use(cors());
app.use(express.json());

// ─── Atlas Connection Test at startup ───────────────────────────────────────
async function testConnection(retries = 3) {
  const url = process.env.MONGODB_URI;
  if (!url) {
    console.error('❌ MONGODB_URI is not set in .env!');
    return;
  }
  for (let attempt = 1; attempt <= retries; attempt++) {
    const client = new MongoClient(url, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    try {
      await client.connect();
      await client.db('admin').command({ ping: 1 });
      console.log('✅ MongoDB Atlas connected successfully!');
      return;
    } catch (err) {
      console.error(`❌ MongoDB connection attempt ${attempt}/${retries} FAILED:`, err.message);
      if (attempt === retries) {
        console.error('👉 Fix: Go to cloud.mongodb.com → Network Access → Add IP Address → Allow Access From Anywhere');
        console.error('⚠️  Server is running but database is unavailable. API routes will fail.');
      } else {
        console.log(`🔄 Retrying in 3 seconds...`);
        await new Promise(r => setTimeout(r, 3000));
      }
    } finally {
      await client.close();
    }
  }
}

// Handle unhandled rejections so server doesn't crash
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});

testConnection();
// ────────────────────────────────────────────────────────────────────────────

app.post('/loginCredentials', async (req, res) => {
  try {
    const { Username, Password } = req.body;
    const result = await LoginCred(Username, Password);
    if (result === 1) {
      res.send('successful');
    } else {
      res.send('unsuccessful');
    }
  } catch (err) {
    console.error('Login route error:', err);
    res.status(500).send('unsuccessful');
  }
});

app.post('/registerCredentials', async (req, res) => {
  try {
    const { Username, Password, Name, City } = req.body;
    const result = await RegisterCred(Username, Password, Name, City);
    if (result === 1) {
      res.send('exists');
    } else if (result === 2) {
      res.send('created');
    } else {
      res.send('unsuccessful');
    }
  } catch (err) {
    console.error('Register route error:', err);
    res.status(500).send('unsuccessful');
  }
});

app.get('/loadDashboard', async (req, res) => {
  try {
    const result = await ActiveUserDetails();
    if (!result) {
      return res.status(404).send('No active user found');
    }
    const WeatherData = await FetchAPIdata(result.City);
    const finData = { result, WeatherData };
    console.log('Sending dashboard data:', result);
    res.send(finData);
  } catch (err) {
    console.error('Dashboard route error:', err);
    res.status(500).send('Error loading dashboard');
  }
});

app.post('/activeUsers', async (req, res) => {
  try {
    const { Username, Password } = req.body;
    const result = await ActiveUsers(Username, Password);
    if (result == 1) {
      res.send('added');
    } else {
      res.send('not added');
    }
  } catch (err) {
    console.error('ActiveUsers route error:', err);
    res.status(500).send('not added');
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
