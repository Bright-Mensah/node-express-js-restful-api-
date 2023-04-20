import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import userSchema from "./Schema/index.js";

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

app.listen(PORT, () =>
  console.log(`server started working on port http://localhost:${PORT}`)
);
