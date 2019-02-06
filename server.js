const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const User = require("./models/User");
let testUsers = require("./utils/test-users");

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(() => console.log("MongoDb Connected..."))
  .catch(error => console.log(error));

// app.get("/addusers", (req, res) => {
//   testUsers().map(userObj => {
//     let newUser = User(userObj);
//     newUser.save();
//   });
//   res.send("Adding Users to DB...");
// });

app.get("/users", (req, res) => {
  User.find()
    .then(users => res.json({ users }))
    .catch(error => res.json({ error: "Error while fetching users." }));
});

app.post("/add", (req, res) => {
  User.findOne({ email: req.body.user.email }).then(user => {
    if (user) {
      res.json({ message: "Email already in use." });
    } else {
      let newUser = User(req.body.user);
      newUser
        .save()
        .then(user => res.json({ user }))
        .catch(error => res.json({ error: "Failed to add user." }));
    }
  });
});

app.post("/delete", (req, res) => {
  User.findByIdAndDelete(req.body.id)
    .then(user => {
      if (user) res.json({ message: "User deleted successfully." });
      else res.json({ mesage: "No such user." });
    })
    .catch(error => console.log(error));
});

app.post("/edit", (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.body.user.id },
    { $set: req.body.user },
    { new: true }
  )
    .then(user => res.json({ message: "User info updated." }))
    .catch(error => res.json({ error: "Could not update user, try again." }));
});

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is running on ${port}...`));
