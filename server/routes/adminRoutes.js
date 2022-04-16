const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const authController = require("../controllers/authController");
router
  .route("/doctors")
  .post(authController.verifyJwtToken, adminController.createDoctor);

router
  .route("/departments")
  .post(authController.verifyJwtToken, adminController.createDepartment);
module.exports = router;
