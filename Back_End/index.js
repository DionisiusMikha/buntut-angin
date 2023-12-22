const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const port = 3000;
const router = require("./src/routes/index");

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/api", router);
app.listen(port, async() => {
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/proyek_fpw')
        console.log('Database connected!');
    }
    catch(err){
        console.log('Error database connection \n', err);
    }
    console.log(`Listening on port ${port}!`);
})