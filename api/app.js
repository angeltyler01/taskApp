const express = require("express");
const app = express();
const { mongoose } = require("./db/mongoose");

const bodyParser = require("body-parser");

//load in mongoose models
const { List, Task } = require("./db/models");

//middleware
app.use(bodyParser.json());

//cors headers middleware
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//Route Handlers

//Route Lists
app.get("/lists", (req, res) => {
  //return array of all the lists in database
  List.find({})
    .then((lists) => {
      res.send(lists);
    })
    .catch((e) => {
      res.send(e);
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
    res.send(listDoc);
  });
});

app.patch("/lists/:id", (req, res) => {
  //update specified list
  List.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

app.delete("/lists/:id", (req, res) => {
  //delete specified list
  List.findOneAndRemove({
    _id: req.params.id,
  }).then((removedListDoc) => {
    res.send(removedListDoc);
  });
});

app.get("/lists/:listId/tasks", (req, res) => {
  // return all tasks for specific lists
  Task.find({
    _listId: req.params.listId,
  }).then((tasks) => {
    res.send(tasks);
  });
});

app.post("/lists/:listId/tasks", (req, res) => {
  // create tasks for the specified list
  let newTask = new Task({
    title: req.body.title,
    _listId: req.params.listId,
  });
  newTask.save().then((newTaskDoc) => {
    res.send(newTaskDoc);
  });
});

app.patch("/lists/:listId/tasks/:taskId", (req, res) => {
  // update specific task for a specific list
  Task.findOneAndUpdate(
    {
      _id: req.params.taskId,
      _listId: req.params.listId,
    },
    {
      $set: req.body,
    }
  ).then(() => {
    res.sendStatus(200);
  });
});

app.delete("/lists/:listId/tasks/:taskId", (req, res) => {
  Task.findByIdAndDelete({
    _id: req.params.taskId,
    _listId: req.params.listId,
  }).then((removedTaskDoc) => {
    res.send(removedTaskDoc);
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
