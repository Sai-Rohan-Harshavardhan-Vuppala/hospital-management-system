const mysqlQuery = require("./connection");
const appError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const authcontroller = require("./authController");

exports.createDoctor = catchAsync(async (req, res, next) => {
  let data = req.body;
  data.password = authcontroller.generatePassword();
  console.log(data);
  let query = `insert into users (username,password,role) values("${data.email}","${data.password}","doctor")`;
  console.log(query);
  let result = await mysqlQuery(query);
  query = `insert into doctors (dname,email,phno,deptId,headId,role,experience,description) values("${data.dname}","${data.email}","${data.phno}",${data.deptId},${data.headId},"doctor",${data.experience},"${data.description}")`;
  console.log(query);
  result = await mysqlQuery(query);
  res.status(200).json({
    status: "New doctor created",
  });
});

exports.createDepartment = catchAsync(async (req, res, next) => {
  let data = req.body;
  let query = `insert into departments (deptId,deptName,headId) values (${data.deptId},"${data.deptName}",${data.headId})`;
  let result = await mysqlQuery(query);
  res.status(200).json({
    status: "New department created",
  });
});
