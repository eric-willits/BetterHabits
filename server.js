const express = require("express");
const mongoose = require("mongoose");
const config = require("config");

//import routes
const groups = require('./routes/api/groups');
const auth = require('./routes/api/auth');

//Initialize app
const app = express();
app.use(express.json());

//DB Config
const db = config.get("mongoURI");

//Connect to Mongo
mongoose.connect(db, {
        'useNewUrlParser': true, 
        'useUnifiedTopology': true, 
        'useFindAndModify': true,
        'useCreateIndex': true
    })
    .then(() => console.log("MongoDB connected."))
    .catch(err => console.log(err));

//USE Routes
app.use("/api/groups", groups);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));