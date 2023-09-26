/* eslint-disable no-undef */
import express, { json } from "express";
import { connect } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import notesRoute from "./routes/notesRoute.js";

dotenv.config();

const PORT = process.env.PORT;

const mongoURL = process.env.MONGO_URI;

const app = express();

//CORS policy handling:
// Allow all the Originis with default of cors(*)
app.use(cors());

app.use(json()); //using middleware so that the request.body can recognise the express server.

app.use("/notes", notesRoute); //tells express that for each request with prefix of books handle them with /books middleware.

app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to MERN Stack");
}); //get is an http method to get resource from the server. takes the first parameter as a string for our route, the second one is a callback to deal with the response and request

connect(mongoURL) //connecting the database
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      //running the express server only if the database connection is successful
      console.log(`App is listening to port:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
