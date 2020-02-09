require("dotenv").config()
const express = require("express")
const app = express()
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require ("mongoose")

mongoose.connect(process.env.MONGO_URI, () => {
  console.log("connected to mongoDB.")
}, { useMongoClient: true})

const mDB = mongoose.connection;
mDB.on('error', console.error.bind(console, 'MongoDB connection error:'));

const account_routes = require("./api/routes/accounts");
const transaction_routes = require("./api/routes/transactions");
const user_routes = require("./api/routes/users");
/* const payments = require("./api/routes/projects")
const user_routes = require("./api/routes/users")
const payment_routes = require("./api/routes/payments")
const test_routes = require("./api/routes/test") */

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Prevente CORS errors
/* app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*") //any origin
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-Width, Content-Type, Accept, Authorization"
  )

  //Supported methods
  if (req.method === "OPTIONS"){
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET")
    return res.status(200).json({})
  }

}) */

app.use("/accounts", account_routes)
app.use("/transactions", transaction_routes)
app.use("/users", user_routes)
//app.use("/users", user_routes)
//app.use("/payments", payment_routes)

//if no one of the before routes match:
app.use((req, res, next) => {
  const error = new Error("Not found")
  error.status = 400
  next(error)
})

app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app
