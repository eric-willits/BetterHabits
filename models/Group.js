const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HabitSchema = require('./Habit').HabitSchema;

//Create Schema
const GroupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    habits: [HabitSchema]
})

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;