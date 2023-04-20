import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

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

app.listen(PORT, () =>
  console.log(`server started working on port http://localhost:${PORT}`)
);
