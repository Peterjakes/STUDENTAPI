const express = require('express');
const routes = express.Router();
const mongoose = require("mongoose"); 
const Student = require("../models/studentModel");

const authController = require('../controller/authcontroller');
const {verifyAccessToken} = require('../helpers/jwtHelper')

routes.post('/register', authController.register);
routes.post('/login', authController.login);
routes.get('/getAllStudents' , authController.getAllStudents);
routes.post('/AddStudent', authController.AddStudent);
routes.get('/getStudent/:id', authController.getStudent);
routes.patch('/updateStudent/:id', authController.updateStudent);
routes.delete('/deleteStudent/:id', authController.deleteStudent);
// routes.post('/AddStudent', authController.restrict('user','admin'),studentcontroller.AddStudent);

module.exports = routes;