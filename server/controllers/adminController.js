const bcrypt = require('bcrypt');
const crypto = require('crypto');
const validator = require('validator');
const mysqlQuery = require('./connection');
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const authController = require('./authController');
const sendEmail = require('../utils/email.js');

exports.createDoctor = catchAsync(async (req, res, next) => {
  let data = req.body;
  if (!validator.isEmail(data.email)) {
    return new appError('Provide a valid email-id');
  }
  let length = 20,
    wishlist =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$';
  password = await Array.from(crypto.randomFillSync(new Uint32Array(length)))
    .map((x) => wishlist[x % wishlist.length])
    .join('');
  pass = await bcrypt.hash(password, 12);
  let query = `insert into users (username,password,role) values("${data.email}","${pass}","doctor")`;
  let result = await mysqlQuery(query);
  query = `insert into doctors (dname,email,phno,deptId,headId,role,experience,description,modifiedAt) values("${data.dname}","${data.email}","${data.phno}",${data.deptId},${data.headId},"${data.role}",${data.experience},"${data.description}",current_date())`;
  console.log(query);
  result = await mysqlQuery(query);
  res.status(200).json({
    status: 'New doctor created',
  });
  try {
    await sendEmail({
      email: data.email,
      subject: 'Edit your profile',
      text: `Your username is ${data.email} and password is ${password}`,
    });

    res.status(200).json({
      status: 'success',
      message: 'Username and password sent to email!',
    });
  } catch (err) {
    console.log(err);
    return next(
      new appError('There was an error sending the email. Try again later!'),
      500
    );
  }
});

exports.createDepartment = catchAsync(async (req, res, next) => {
  let data = req.body;
  let query = `insert into departments (deptId,deptName,headId) values (${data.deptId},"${data.deptName}",${data.headId})`;
  let result = await mysqlQuery(query);
  res.status(200).json({
    status: 'New department created',
  });
});
