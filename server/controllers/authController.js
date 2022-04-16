const jwt = require('jsonwebtoken');
const validator = require('validator');
const { promisify } = require('util');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mysqlQuery = require('./connection');
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const createToken = (username, role) => {
  const jwtToken = jwt.sign({ username, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return jwtToken;
};

const createSendToken = (user, statusCode, res) => {
  try {
    const token = createToken(user.username, user.role);
    const expireAt = new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    );
    const cookieOptions = {
      expires: expireAt,
      httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') {
      cookieOptions.secure = true;
    }

    res.cookie('jwt', token, cookieOptions);
    res.status(statusCode).json({
      status: 'success',
      verification: true,
      user,
      expireAt,
      token,
    });
  } catch (error) {
    res.send(error);
  }
};

correctPassword = async (originalPassword, password) => {
  password = await bcrypt.hash(password, 12);
  let a = await bcrypt.compare(password, originalPassword);
  return a;
};
exports.signup = catchAsync(async (req, res, next) => {
  data = req.body;
  console.log(data);
  if (!validator.isEmail(data.email)) {
    return new appError('Please provide a valid email-id');
  }
  let query = `select * from users where username="${data.email}"`;
  let result = await mysqlQuery(query);
  // console.log(result);
  if (result.length === 1) {
    return new appError('Email-id is already registered');
  }
  if (data.password !== data.confirmPassword) {
    return new appError('Password not matching');
  }
  let pass = await bcrypt.hash(data.password, 12);
  // console.log(pass);
  query = `insert into users (username,password,role) values ("${data.email}","${pass}","patient")`;
  // console.log(query);
  result = await mysqlQuery(query);
  query = `insert into patients (pname,email,gender,dob,height,weight,phno) values ("${data.pname}","${data.email}","${data.gender}","${data.dob}",${data.height},${data.weight},${data.phno})`;
  // console.log(query);
  result = await mysqlQuery(query);
  res.status(200).json({
    status: 'success',
    message: 'New patient created',
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { username, password } = req.body;
  if (!validator.isEmail(username))
    return new appError('Please provide a valid email-id');
  let result = await mysqlQuery(
    `select * from users where username="${username}"`
  );
  if (result.length == 0)
    return new appError('Username not present in database');
  let f = correctPassword(result[0].password, password);
  if (f) {
    user = result[0];
  } else {
    return new AppError('Password not matched');
  }
  createSendToken(user, 200, res);
});

exports.verifyJwtToken = async (req, res, next) => {
  try {
    // 1) Getting token and check ff it's there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    // console.log(token);
    if (!token) {
      throw 'Token not present';
    }

    // 2) Verifying token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // console.log(decoded);
    const username = decoded.username;
    const role = decoded.role;
    let result = await mysqlQuery(
      `select * from users where username="${username}" and role="${role}"`
    );
    // console.log(result);
    if (result.length == 0) {
      throw 'Invalid Token';
    } else {
      req.user = result[0];
      next();
    }
  } catch (err) {
    res.status(404).send(err);
  }
};

exports.generatePassword = catchAsync(
  async (
    length = 20,
    wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$'
  ) => {
    password = await Array.from(crypto.randomFillSync(new Uint32Array(length)))
      .map((x) => wishlist[x % wishlist.length])
      .join('');
    pass = await bcrypt.hash(password, 12);
    //console.log(password, pass);
  }
);
