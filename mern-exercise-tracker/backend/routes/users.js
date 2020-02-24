                // same code is pasted on the users.js with few changes,cus they're same endpoint
const express = require('express')   //req the express library
const router = express.Router()    // then call the router method
let User = require('../models/user.model');     //the mongoose module

//first endpoint that handles http get request on /user URL path
router.route('/').get((req,res) => {
    User.find()         //mongoose method thats gets all users frm the db, ret a promise
        .then(users => res.json(users))     // ret in json format
        .catch(err => res.status(400).json('Error: '+ err));    // if not ret error page 400
});

//first endpoint that handles http post request on /user URL path
router.route('/add').post((req,res)=>{
    const username = req.body.username;

    const newUser = new User({username});       //new instance of user

    newUser.save()      // saved to the mongoDB db
        .then(()=> res.json('User added'))      // ret in json format
        .catch(err => res.status(400).json('Error: '+ err));        // if not ret error page 400
});

module.exports = router;