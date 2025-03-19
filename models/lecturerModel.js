// // models/lecturerModel.js
// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const lecturerSchema = new Schema({
//     title: {
//         type: String,
//         required: [true, 'Title is required']
//     },
//     description: {
//         type: String,
//         required: [true, 'Description is required']
//     },
//     duration: {
//         type: Number,
//         required: [true, 'Duration is required']
//     },
//     courseId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'course'
//     },
//     instructor: {
//         type: String,
//         required: [true, 'Instructor name is required']
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
  
// });

// const Lecturer = mongoose.model('lecturer', lecturerSchema);

// module.exports = Lecturer;