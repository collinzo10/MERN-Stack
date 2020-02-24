const express = require('express');   //bodyaparser is included in the new version of express
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;  //port number

//cors middleware
app.use(cors());
app.use(express.json());   //allow us to pass json,cuz server will be sending and recieving json

const uri = process.env.ATLAS_URI;   //gotten from mongodb dashboard
//for the connection string to work we need to env variable(atlas_uri) above
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });  //usi=>where db is stored
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
})

//connecting the routes
const exerciseRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exerciseRouter);
app.use('/users', usersRouter);

//what starts the server
app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
});