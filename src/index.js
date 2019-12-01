const express = require('express');
const cors =  require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const config = require('./config');
const AuthToken = require('./middlewares/auth-token');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


const client = new MongoClient(config.getDB(), { useNewUrlParser: true });
client.connect(
  (res) =>{
    console.log('db connected successfully');
  },
  (err) => {
  console.log('error db connection', err);
  client.close();
});

mongoose.connect(config.getDB(), (err, res) => {
    if (err){
        console.log('mongoose error trying connect');
    } else{
        console.log("mongoose connected successfully");
    }
});


//Set up application
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//Set up middleware's
app.use(morgan('dev'));
app.use(AuthToken);

//routes
app.use('/api/',require('./routes/common'));
app.use('/api/todo',require('./routes/todo'));
app.use('/api/users',require('./routes/user'));
app.use('/api/auth', require('./routes/authentication'));

//start's server
app.listen(config.port , () =>{
    console.log(`Server running on port ${config.port}`)
});

module.exports = app;