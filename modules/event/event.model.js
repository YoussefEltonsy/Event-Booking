import mongoose from 'mongoose'
import CATEGORIES from '../../constants/categories.js'
import STATUS from '../../constants/status.js'

const eventSchema = new mongoose.Schema(
    {
        title:{
            type: String,
            required:true
        },

        description:{
            type: String,
            maxlength: 1000
        },

        location:{
            type:String,
            required:true
        },

        date:{
            type:Date,
            required:true
        },

        price:{
            type:Number,
            required:true,
            min:0
        },

        capacity:{
            type:Number,
            required:true,
            min:1
        },

        bookedSeats:{
            type:Number,
            default:0,
            min:0
        },

        image:{
            type:String //URL
            required:false,
            default:null
        },

        category:{
            type:String,
            enum: Object.values(CATEGORIES),
            default: CATEGORIES.CONCERT
        },

        status:{
            type:String,
            enum: Object.values(STATUS),
            required:true,
            default:STATUS.UPCOMING
        },

        createdBy:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

    }
    {
        TimeStamps: true
    }
)

eventSchema.virtua;('availableSeats').get(function(){
    return this.capacity - this.bookedSeats
})

eventSchema.pre('save', function(next){
    if(this.bookedSeats> this.capacity)
        return next(new Error('Booked seats cannot exceed capacity'))
    next()
}
)

export default eventSchema