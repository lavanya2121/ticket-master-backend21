const mongoose=require('mongoose')
const Schema=mongoose.Schema

//Customer Schema
const employeeSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    department:{
        type: Schema.Types.ObjectId,
        //required: true,
        ref: 'Department'
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

//customer model
const Employee=mongoose.model('Employee',employeeSchema)

module.exports=Employee