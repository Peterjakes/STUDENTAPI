const createError = require("http-errors");
const Auth = require("../models/authModel");
const Student = require("../models/studentModel"); 
const mongoose = require("mongoose");   
const { authSchema } = require("../helpers/validationSchema");
const { signAccessToken, signRefreshToken } = require("../helpers/jwtHelper")
module.exports ={

    register: async(req, res, next) => {
        try{
            //const {email, password}= req.body;
            //if(!email || !password) throw createError.BadRequest();

            const result = await authSchema.validateAsync(req.body);
            const {email} = result;

            const Exists = await Auth.findOne({email:email})

            if(Exists) throw createError.Conflict(`${email} is already been registered`)
            const auth= new Auth (result)

            const savedAuth = await auth.save()




        }catch (error){
        if(error.isJoi === true) error.status = 422
        next(error)
        }
    },

    login: async(req, res,next)=>{
        try{
            const result = await authSchema.validateAsync(req.body)
            const user = await Auth.findOne({email: result.email})
            if(!user) throw createError.NotFound('user not registred')

            //matching the password
            const IsMatch = await user.isValidPassword(result.password)
            if(!IsMatch) throw createError.Unauthorized('Username/Password not valid')

            // if password match  then generate token
            const accessToken = await signAccessToken(user.id,user)
            // const refreshToken = await signRefreshToken(user.id)

            res.send({accessToken})

        }catch(error){
            if(error.isJoi=== true)
                return next(createError.BadRequest('Invalid username/password'))
        }
    },
    getAllStudents: async (req, res, next) => {
        try {
            const students = await Student.find();  // ✅ Correct Model
            res.send(students);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    },
    
    AddStudent: async (req, res, next) => {
        try {
            const student = new Student(req.body);
            const result = await student.save();
            res.send(result);
        } catch (error) {
            console.log(error.message);
            next(error);
        }
    },
      getStudent: async (req, res, next) => {
            const id = req.params.id;
            try {
                const student = await Student.findById(id);
                if (!student) {
                    throw createError(404, "Student does not exist");
                }
                res.send(student);
            } catch (error) {
                console.log(error.message);
                if (error instanceof mongoose.CastError) {
                    next(createError(400, "Invalid student ID"));
                    return;
                }
                next(error);
            }
        },
    updateStudent: async (req, res, next) => {
        try {
            const id = req.params.id;
            const update = req.body;
            const options = { new: true };

            const result = await Student.findByIdAndUpdate(id, update, options);

            if (!result) {
                throw createError(404, "Student does not exist");
            }

            res.send(result);
        
        } catch (error) {
            console.log(error.message);

            if (error instanceof mongoose.CastError) {
                return next(createError(400, "Invalid student ID"));
            }
            
            next(error);
        }
    },

    deleteStudent: async (req, res, next) => {
        const { id } = req.params;
    
        // Validate MongoDB ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(createError(400, "Invalid student ID format"));
        }
    
        try {
            const student = await Student.findByIdAndDelete(id);
            
            if (!student) {
                return next(createError(404, "Student does not exist"));
            }
    
            res.status(200).json({ message: "Student deleted successfully", student });
        } catch (error) {
            console.error("Error deleting student:", error.message);
            next(error);
        }
    },

}
