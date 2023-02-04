
require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true
});


const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('connected', () => console.log("Connected to database"))

app.use(express.json())

const subcribersRouters = require('./routes/subscribers')

app.use('/subscribers', subcribersRouters)

app.listen(3000, () => console.log('Server started!..'))