const express = require('express');
const router = express.Router();
const Class = require('../models/classroom_model');

// Get Data for all the Classrooms
router.get('/', (req,res) => {
    Class.find()
        .then((Classes) => res.json(Classes))
        .catch((err) => res.status(400).json('Error '+err));
});

// Get Data for Classroom with specific ID
router.get('/:cId', (req,res) => {
    Class.find({ "classname": { $regex: req.params.eId, $options: 'i' }})
        .then((Classes) => res.json(Classes))
        .catch((err) => res.status(400).json('Error '+err));
});

// Add Classroom
router.post('/add', (req,res) => {
    const addClass = new Class({
        classname: req.body.classname,
        date: Date.parse(req.body.date),
        classcode: req.body.classcode,
        duration: Number(req.body.duration),
        slots: req.body.slots
    });
    addClass.save()
        .then(() => res.json("Class Added"))
        .catch((err) => res.status(400).json('Error: '+err));
});

module.exports = router;
