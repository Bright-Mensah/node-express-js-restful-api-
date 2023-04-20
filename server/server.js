import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userSchema from "./Schema/index.js";
import taskSchema from "./Schema/task.js";
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());

const connection =
  "mongodb+srv://BrightMensah:Mensah12@cluster0.l9dlivv.mongodb.net/?retryWrites=true&w=majority";

// connect to the database
mongoose
  .connect(connection)
  .then(() => console.log("connected successfully"))
  .catch(() => console.log("connection was unsuccessful"))
  .finally(() => console.log("start working"));

const PORT = 6200;

app.get("/", (req, res) => {
  res.send("welcome to Bright Mensah crudApp server");
});

// sign up user
app.post("/Signup", (req, res) => {
  // check if user exist
  userSchema
    .findOne({
      email: req.body.email,
    })
    .then((userExist) => {
      if (userExist) {
        // if the email exist prompt the user that there's already an account associated with the email
        res.send({ msg: "user exist already" });
      } else {
        // if the email does not exist then allow the user to signup
        const user = new userSchema({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        });

        user
          .save()
          .then(() => res.send({ msg: "user added" }))
          .catch(() => res.send({ msg: "something went wrong......." }));
      }
    });
});

// login user
app.post("/login", (req, res) => {
  // check if email exist or not
  userSchema
    .findOne({
      email: req.body.email,
    })
    .then((emailExist) => {
      if (emailExist) {
        //if email exist , check if the email matches with the password
        const userPassword = req.body.password;

        {
          userPassword === emailExist.password
            ? res.send({ msg: "login successful" })
            : res.send({ msg: "failed" });
        }
      } else {
        // if the email does not exist then send an error message to the user
        res.send({ msg: "failed" });
      }
    });
});
// add task
app.post("/task", function (req, res) {
  // check if task exist
  // check with both the title and the description
  taskSchema
    .findOne({
      title: req.body.title,
      description: req.body.description,
    })
    .then((taskExist) => {
      if (taskExist) {
        // if task exist prompt the user that task already exist
        res.send({ msg: "task already exist" });
      } else {
        // if task does not exist then allow the user to create a task
        let userTask = new taskSchema({
          title: req.body.title,
          description: req.body.description,
        });

        userTask
          .save()
          .then(() => res.send({ msg: "task added successfully" }))
          .catch(() => res.send({ msg: "something went wrong, try again" }));
      }
    });
});

// get all task (read task)
app.get("/task", function (req, res) {
  // get all task from the db
  taskSchema
    .find({})
    .then((data) => res.send(data))
    .catch(() => res.send({ msg: "something went wrong....." }));
});

// get task for update and delete
app.get("/task/:id", function (req, res) {
  const id = req.params.id;
  taskSchema
    .findById(id)
    .then((data) => res.send(data))
    .catch(() => res.send({ msg: "something went wrong ....." }));
});

// update task
app.put("/task/:id", (req, res) => {
  // get task by id and update
  taskSchema
    .findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      updated_at: new Date(),
    })
    .then((data) => res.send({ msg: "task updated successfully", data }))
    .catch(() => res.send({ msg: "something went wrong...." }));
});

// delete task
app.delete("/task/:id", function (req, res) {
  // get task id and delete them
  const id = req.params.id;

  taskSchema
    .findByIdAndDelete(id)
    .then(() => res.send({ msg: "task deleted successfully" }))
    .catch({ msg: "something wernt" });
});

// delete all task from the database

app.listen(PORT, () =>
  console.log(`server started working on port http://localhost:${PORT}`)
);
