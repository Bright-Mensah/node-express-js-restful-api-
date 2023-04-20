import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

const PORT = 6200;

app.get("/", (req, res) => {
  res.send("welcome to Bright Mensah crudApp server");
});

app.listen(PORT, () =>
  console.log(`server started working on port http://localhost:${PORT}`)
);
