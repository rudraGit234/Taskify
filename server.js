"use strict";

// Creating an express server
import express from "express";
//for the port
import dotenv from "dotenv"
import appRouter from "./routes/contactRoutes.js"; // router for crud 
import authenticateRouter from "./routes/userRoutes.js"
// router for authentiction  and tokens
import erroHandler from "./middleware/errorHandler.js";
import connectDb from "./config/dbConnection.js";
// import contactModel from "./models/contactModel.js";
dotenv.config();

connectDb(); // mongoose connection 
// console.log(contactModel);

const app = express();

// importing port from env file 
const port = process.env.PORT || 5000;

//middleware helps to add additional functionality to the app use app.use for it 

app.use(express.json()); //  a  middleware parser which helps to pass the json body data from client on the server side 
app.use("/api/contacts", appRouter)// for appRouters in CRUD
app.use("/api/users", authenticateRouter)

app.use(erroHandler)// for error handling 


// starting web server and binding it with port with listen function of express
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})

