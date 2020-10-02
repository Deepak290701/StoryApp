const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const app = express();

//Load Config Files
dotenv.config({path : './config/config.env'});

//Connectiong to database 
connectDB();


const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server is Running on Port ${PORT} in ${process.env.NODE_ENV} mode`));