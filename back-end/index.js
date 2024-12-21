const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path= require('path')

dotenv.config({path: '../.env'});

const app = express();
const port = 3000;


app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors)

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=>{
    console.log('Connected to MongoDB')
})
.catch((err) =>{
    console.error('MongoDB connection error:', err);
})

app.use(express.static(path.join(__dirname, 'Front-end')));

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname, 'Front-end', 'home.html'));
})

app.listen(port, ()=>{
    console.log(`Listening at port ${port}`)
})