const mongoose=require('mongoose')

const Schema=mongoose.Schema

//ticket schema
const ticketSchema=new Schema({
    code:{
        type:String,
        required:true
    },
    customer:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Customer'
    },
    department:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Department'
    },
    employees:[{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Employee'
    }],
    priority:{
        type:String,
        enum:['high','medium','low']
    },
    message:{
        type:String,
        required:true,
        minlength:5
    },
    isResolved:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    user : {
        type : Schema.Types.ObjectId,
        required : true,
       // ref : 'User'
    }

})

// model 
const Ticket = mongoose.model('Ticket', ticketSchema)

module.exports = Ticket