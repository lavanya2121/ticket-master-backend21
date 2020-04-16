const mongoose=require('mongoose')
const Schema=mongoose.Schema

//Department Schema
const departmentSchema=new Schema({
    name:{
        type:String,
        required:true
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
const Department=mongoose.model('Department',departmentSchema)

module.exports=Department