const express = require('express');
const router = express.Router();

//import auth middleware
const auth = require('../../middleware/auth');

//Group Model
const Group = require('../../models/Group');
//Habit Model
const Habit = require('../../models/Habit').default;
//User Model
const User = require('../../models/User');

// @route GET api/groups
// @desc Get All Groups
// @access Private
router.get("/", auth, (req, res) => {
    User.findById(req.user.id).populate("groups").exec((err, foundUser) => {
        if(err){
            res.send("error");
        } else {
            return res.json(foundUser.groups)
        }
    })
})

// @route POST api/groups
// @desc Create A Group
// @access Private
router.post('/', auth, (req, res) => {

    Group.create({name: req.body.name})
        .then(newGroup => {
            User.findById(req.user.id)
                .then(foundUser => {
                    foundUser.groups.push(newGroup);
                    foundUser.save().then(user => {
                        newGroup.users.push(foundUser);
                        newGroup.save().then(() => res.json(newGroup));
                    });
                })
        })
})

// @route PUT api/groups/adduser
// @desc Add user to group
// @access Private
router.put('/adduser', auth, (req, res) => {
    User.findOne({ username: req.body.username})
        .then(foundUser => {
            Group.findById(req.body.groupId)
                .then(foundGroup => {
                    foundUser.groups.push(foundGroup);
                    foundUser.save().then(() => {
                        foundGroup.users.push(foundUser);
                            foundGroup.habits.forEach(habit => {
                                habit.data.push({
                                    username: foundUser.username,
                                    data: []
                                });
                            });
                        foundGroup.save().then(group => res.json(group));
                    })
                })
        })
})

// @route PUT api/groups/:id
// @desc Put new habit on group
// @access Private
router.put('/:id', auth, (req, res) => {
    const newHabit = new Habit({
        name: req.body.name,
        data: []
    });
    
    newHabit.save()
        .then(habit => {
            Group.findById(req.params.id)
                .then(group => {
                    initUserData = [];
                    group.users.forEach(userRef => {
                        User.findById(userRef)
                            .then(user => {
                                initUserData.push({
                                    username: user.username,
                                    data: []
                                })
                            })
                    });
                    setTimeout(() => {
                        habit.data = initUserData;
                        habit.markModified('data');
                        habit.save().then(() => console.log("Habit Updated"));
                        group.habits.push(habit);
                        group.save().then(group => res.json(group));
                    }, 500);
                })
        });
})

// @route PUT api/groups/:id/delete
// @desc Delete habit from group
// @access Private
router.put('/:id/delete', auth, (req, res) => {
    Habit.findById(req.body.habitId)
        .then(habit => {
            habit.remove()
                .then(() => {
                    Group.findById(req.params.id)
                        .then(group => {
                            const updatedHabits = group.habits.filter(habit => habit._id != req.body.habitId);
                            group.habits = updatedHabits;
                            group.markModified("habits");
                            group.save().then(() => res.json(group));
                        })
                })
        })
})

// @route PUT api/groups/:id/updatehabit
// @desc Add entry to group habit
// @access Private
router.put('/:id/updatehabit', auth, (req, res) => {
    Group.findById(req.params.id)
        .then(group => {
            req.body.habitData.forEach(habitEntry => {
                let habitIndex = group.habits.findIndex( habit => habit._id == habitEntry.habitId );
                let userIndex = group.habits[habitIndex].data.findIndex( user => user.username === req.user.username);
                group.habits[habitIndex].data[userIndex].data.push({
                    day: req.body.today,
                    value: habitEntry.value
                });
            })
            group.markModified('habits');
            group.save().then(() => res.json(group));
        })
})

// @route Delete api/groups/:groupId
// @desc Delete group
// @access Private
router.delete("/:groupId", auth, (req, res) => {
    Group.findByIdAndDelete(req.params.groupId)
        .then(group => {
            group.users.forEach(userRef => {
                User.findById(userRef)
                    .then(foundUser => {
                        const newGroups = foundUser.groups.filter(groupRef => groupRef !== req.params.groupId);
                        foundUser.groups = newGroups;
                        foundUser.save().then(() => console.log(`${foundUser.username} updated!`));
                    })
            })
            return res.json({ msg: 'Group deleted.', groupId: req.params.groupId });
        })
        .catch(err => res.status(400).json({ msg: 'Something happened.' }));
})



module.exports = router;
