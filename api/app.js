const express = require("express");
const app = express();
const { mongoose } = require("./db/mongoose");

const bodyParser = require("body-parser");

//load in mongoose models
const { List, Task } = require('./db/models');

//middleware
app.use(bodyParser.json());

//Route Handlers

//Route Lists
app.get("/lists", (req, res) => {
  //return array of all the lists in database
  List.find({}).then((lists) => {
    res.send(lists);
  });
});

app.post("/lists", (req, res) => {
  //create new list and return new list to user (includes ID)
  let title = req.body.title;

  let newList = new List({
    title,
  });
  newList.save().then((listDoc) => {
    //full list document is returned (with id)
    req.send(listDoc);
  });
});

app.patch("/lists:id", (req, res) => {
  //update specified list
});

app.delete("/lists:id", (req, res) => {
  //delete specified list
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
