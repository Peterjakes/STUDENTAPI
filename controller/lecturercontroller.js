// // controller/lecturercontroller.js
// const Lecturer = require('../models/lecturerModel');
// const mongoose = require('mongoose');
// const createError = require('http-errors');

// module.exports = {
//     getAllLecturers: async(req, res, next) => {
//         try {
//             const result = await Lecturer.find();
//             res.send(result);
//         } catch (error) {
//             console.log(error.message);
//             next(error);
//         }
//     },

//     addLecturer: async(req, res, next) => {
//         try {
//             const lecturer = new Lecturer(req.body);
//             const result = await lecturer.save();
//             res.send(result);
//         } catch (error) {
//             console.log(error.message);
//             if(error.name === "ValidationError") {
//                 next(createError(422, error.message));
//                 return;
//             }
//             next(error);
//         }
//     },

//     getLecturer: async(req, res, next) => {
//         const id = req.params.id;
//         try {
//             const lecturer = await Lecturer.findById(id);
//             if(!lecturer) {
//                 throw createError(404, "Lecturer does not exist");
//             }
//             res.send(lecturer);
//         } catch (error) {
//             console.log(error.message);
//             if(error instanceof mongoose.CastError) {
//                 next(createError(400, "Invalid lecturer id"));
//                 return;
//             }
//             next(error);
//         }
//     },

//     updateLecturer: async(req, res, next) => {
//         try {
//             const id = req.params.id;
//             const update = req.body;
//             const options = {new: true};
//             const result = await Lecturer.findByIdAndUpdate(id, update, options);

//             if(!result) {
//                 throw createError(404, "Lecturer does not exist");
//             }

//             res.send(result);
//         } catch (error) {
//             console.log(error.message);
//             if(error instanceof mongoose.CastError) {
//                 return next(createError(400, "Invalid lecturer id"));
//             }
//             next(error);
//         }
//     },

//     deleteLecturer: async(req, res, next) => {
//         try {
//             const id = req.params.id;
//             const result = await Lecturer.findByIdAndDelete(id);
            
//             if(!result) {
//                 throw createError(404, "Lecturer does not exist");
//             }
            
//             res.send(result);
//         } catch (error) {
//             console.log(error.message);
//             if(error instanceof mongoose.CastError) {
//                 return next(createError(400, "Invalid lecturer id"));
//             }
//             next(error);
//         }
//     },

//     // Additional useful method
//     getLecturersByCourse: async(req, res, next) => {
//         try {
//             const courseId = req.params.courseId;
//             const lecturers = await Lecturer.find({ courseId: courseId });
//             res.send(lecturers);
//         } catch (error) {
//             console.log(error.message);
//             next(error);
//         }
//     }
// };