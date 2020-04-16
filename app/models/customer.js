const mongoose=require('mongoose')
const Schema=mongoose.Schema

//Customer Schema
const customerSchema=new Schema({
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
const Customer=mongoose.model('Customer',customerSchema)

module.exports=Customer