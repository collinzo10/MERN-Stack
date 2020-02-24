            // same code is pasted on the exercises.js with few changes,cus they're same endpoint
const express = require('express')
const router = express.Router()    // the router
let Exercise = require('../models/exercise.model');     //the mongoose module

//first endpoint that handles http get request on /user URL path
router.route('/').get((req,res) => {
    Exercise.find()         //mongoose method thats gets all exercises frm the db, ret a promise
        .then(exercises => res.json(exercises))     // ret in json format
        .catch(err => res.status(400).json('Error: '+ err));    // if not ret error page 400
});

//first endpoint that handles http POST request on /user URL path
router.route('/add').post((req,res)=>{
    //content of the body
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration); //converting the duration to a number
    const date = Date.parse(req.body.date);     //converting the date to a date

    //new instance of user
    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });       

    newExercise.save()      // saved to the mongoDB db
        .then(()=> res.json('Exercise added'))      // ret in json format
        .catch(err => res.status(400).json('Error: '+ err));        // if not ret error page 400
});

//:id = obj id in mongoose
router.route('/:id').get((req,res)=>{
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/:id').delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)   //req.params.id => get parameter from the URL
        .then(() => res.json('Exercise deleted'))
        .catch(err => res.status(400).json('Error:'+ err));
});

router.route('/update/:id').post((req,res)=>{
    Exercise.findByIdAndUpdate(req.params.id)
        .then(exercise =>{
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date(req.body.date);

            //save it
            exercise.save()
                .then(() => res.json('exercise Updated!'))
                .catch(err => res.status(400).json('Error: '+ err))
        } )
        .catch(err =>res.status(400).json('Error: ' + err));
});

module.exports = router;