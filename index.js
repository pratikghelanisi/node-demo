require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express')
const app = express()
const port = process.env.PORT;
const db_URL = process.env.db_URL;
const router = require('./routes/index')
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(express.static('public'));
app.use('/api/',router);
app.listen(port, () => { console.log( `Successfully Run on ${port}`);})