require('dotenv').config()
const express = require('express')
const MongoClient = require('mongodb').MongoClient
const app = express()
const port = process.env.SERVER_PORT || 3000
const mongoURL = process.env.MONGO_URL || "mongodb://127.0.0.1:27017"


async function initMongo() {
    console.log('Initialising MongoDB...')
    let success = false
    while (!success) {
      try {
        client = await MongoClient.connect(mongoURL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        success = true
      } catch {
        console.log('Error connecting to MongoDB, retrying in 1 second')
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }
    console.log('MongoDB initialised')
    return client.db(client.s.options.dbName).collection('notes')
}

async function start() {
    const db = await initMongo()
    console.log('Starting server')
    app.get('/', (req, res) => res.send('Hello World!'))

    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
}

start()