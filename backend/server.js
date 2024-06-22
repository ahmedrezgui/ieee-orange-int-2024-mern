require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const workoutRoutes = require('./routes//workoutRoutes');


const app = express();

app.use(express.json());


app.use('/workouts', workoutRoutes);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port', process.env.PORT);
        })
    })
    .catch((err) => { console.log(err) })


