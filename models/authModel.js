const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const authSchema = new Schema({
    email: {
        type: String,
        required: [true, 'E-mail is required'],
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },

    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
    }
   
   
})

authSchema.pre('save' , async function(next){
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(this.password, salt)
        this.password = hashedPwd
        next()
    } catch (error){
        next(error)
    }
})

//comparing the entered password and one saved in the DB
authSchema.methods.isValidPassword = async function(password){
    try{
        return await bcrypt.compare(password, this.password)
    }catch (error){
     throw error
    }
}


const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;