const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const HabitSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    data: []
})

const Habit = mongoose.model("Habit", HabitSchema);

module.exports = {
    HabitSchema,
    default: Habit
};

