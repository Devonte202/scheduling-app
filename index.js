import express from 'express';
import query from './database/db.js';
// Create the server
const app = express();
const PORT = process.env.PORT || 5000;

// Extra dependencies required to parse bodies and cookies
import path from "path";
import cookieParser from "cookie-parser";

// API Routers required here
import employeeRouter from "./routes/employeeRouter.js";
//const businessRouter = require("./routes/businessRouter");
//const customerRouter = require("./routes/customerRouter");
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser());

// Adds routers as abstraction middleware
app.use(employeeRouter);
//app.use(businessRouter);
//app.use(customerRouter);

// Serve our base route that returns a message
app.get('/api/checkConnection', (req, res) => {
  try {
    const testMessage = 'Welcome to Skedulrr';
    res.status(200).json({message: testMessage});
  } catch (err) {
    console.log(err);
  }
})

app.get('/api/testDBConnection', (req, res) => {
  const queryText = 'SELECT * FROM employee;';
        query(queryText).then(results => {res.json({query: results.rows[0]})});
})

app.get('/', (req, res) => {
  res.status(200).json({serverStatus: "Up and Running"});
})


app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`)
})