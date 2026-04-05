import {mongoose} from "mongoose";
import bcrypt from 'bcrypt';
import ROLES  from '../../constants/roles.js';

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: Object.values(ROLES),
        default: ROLES.USER
    },

    avatar: {
        type: String,
        required: false
}},

    {
    TimeStamps: true
    }
)


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

export default mongoose.model('User', userSchema)