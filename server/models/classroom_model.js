// Schema for Events
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classroomSchema = new Schema ({
    classname: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    classcode: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    slots: {
        type: Object,
        required: true
    },
});

module.exports = event_model = mongoose.model( "classrooms", classroomSchema );