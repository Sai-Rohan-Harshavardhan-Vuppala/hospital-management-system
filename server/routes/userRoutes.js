const { Router } = require('express');
const express = require('express');
const { verifyJwtToken } = require('../controllers/authController');
const userController = require('../controllers/userController');
const router = express.Router();

router.use(verifyJwtToken);

router.route('/appointments').post(userController.bookAppointment);

router
  .route('/appointments/:id')
  .get(userController.getAppointmentById)
  .delete(userController.cancelAppointmentById);

router.route('/doctor/:id').get(userController.getDoctorsByDeptId);

router
  .route('/appointments/patients/:id')
  .get(userController.getPatientAppointmentsbyId);

router
  .route('/appointments/doctors/:id')
  .get(userController.getDoctorAppointmentsbyId);

// router.route('/prescriptions').post(userController.addPrescription);
module.exports = router;
