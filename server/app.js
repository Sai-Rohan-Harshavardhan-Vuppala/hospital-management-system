const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const app = express();
const globalErrorHandler = require("./controllers/errorController");
const authRouter = require("./routes/authRoutes");
const adminRouter = require("./routes/adminRoutes");
//const patientRouter = require("./routes/patientRoutes");

app.use(express.json());
app.use(cookieParser());
const requestLogger = (request, response, next) => {
  console.log("request method: " + request.method);
  console.log("request path: " + request.path);
  console.log("request body: ");
  console.log(request.body);
  console.log("--------------------------------------------------");
  next();
};
app.use(requestLogger);
app.use("/", authRouter);
app.use("/admin", adminRouter);
//app.use("/patient", patientRouter);
app.use(globalErrorHandler);
module.exports = app;
