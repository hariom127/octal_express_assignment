require('dotenv').config()
const express = require('express')
const app = express()

const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')

const PORT = process.env.PORT || 3000;


//---import mongoose db object----
const mongoose = require('mongoose');


//---assets--
app.use(express.static('public'));

// -- set template engion--
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')


//---enable express for json request 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// --import routes---
require('./routes/api')(app);
require('./routes/web')(app);

//--database connection
const url = 'mongodb://localhost/octal_assignment'
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true, useFindAndModify: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('db connected...');
}).catch(err => { 
    console.log('db connection failed...');
});


app.listen(PORT, () => {
    console.log('Server start')
})