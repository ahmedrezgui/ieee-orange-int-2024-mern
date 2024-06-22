require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');



const app = express();

app.use(express.json());
app.get('/', (req, res) => {
    res.json({ mssg: "hello" });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Server is running on port', process.env.PORT);
        })
    })
    .catch((err) => { console.log(err) })


