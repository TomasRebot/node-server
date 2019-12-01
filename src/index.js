const express = require('express');
const cors =  require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//connect to db local mode
// mongoose.connect('mongodb://localhost/mcga', (err, res)=>{
//     if(err) console.log('error trying connect');
//     else console.log('connection success')
// });



//conect to db in production mode

const uri = "mongodb+srv://arfeli:sinpassword@cluster0-twuwn.mongodb.net/test?retryWrites=true&w=majority";
// const uri = "mongodb+srv://alejandro.arfeli@gmail.com:Thornix22@cluster0-twuwn.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

client.connect(
  res =>{
    console.log('db connected ?');
  },
  err => {
  console.log('error connection');
  // perform actions on the collection object
  client.close();
});

mongoose.connect(uri, (err, res)=>{
    if(err) console.log('error trying connect');
    else console.log('connection success')
});


//Set up application
app.set('port', 3000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//Set up middlewares
app.use(morgan('dev'));

//routes
app.use('/api/',require('./routes/common.js'));
app.use('/api/todo',require('./routes/todo.js'));
app.use('/api/users',require('./routes/user.js'));

//start's server
app.listen(process.env.PORT || 3000, () =>{
    console.log("Server runing")
});
