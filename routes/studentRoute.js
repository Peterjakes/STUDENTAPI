const express = require('express');
const routes = express.Router();

const studentController = require('../controller/studentcontroller');
const {verifyAccessToken } = require ('../helpers/jwtHelper')


// Get all students
routes.get('/getAllStudents', verifyAccessToken , studentController.getAllStudents);

// Add student
routes.post('/AddStudent', studentController.AddStudent);

// Get student
routes.get('/getStudent/:id', studentController.getStudent);

// Update student
routes.patch('/updateStudent/:id', studentController.updateStudent);

// Delete student
routes.delete('/deleteStudent/:id', studentController.deleteStudent);


module.exports = routes;