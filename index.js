require('dotenv').config()
const express = require('express');
const cors = require ('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors())
app.use (express.json())

require('./src/routes/route')(app);

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@restagenda.i0sro.mongodb.net/?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log('Mongoose conectado!')
        app.listen(3001)
    }
    ) .catch ((err) => console.log(err))

//app.use(
//     express.urlencoded({
//     extended: true,
//    })
//)