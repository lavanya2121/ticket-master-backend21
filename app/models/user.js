//user Authentication 
const mongoose=require('mongoose')
const validator=require('validator')
const bcryptjs=require('bcryptjs')
const jwt=require('jsonwebtoken')

const Schema=mongoose.Schema

//User Schema
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
       // minlength:5
    },
    email:{
        type:String,
        required:true,
        unique:true,
        //custom validation
        validate:{
            validator:function(email){
                return validator.isEmail(email)
            },
            message:function(){
                return 'invalid email format'
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:128
    },
    tokens : [
        {
            token : {
                type : String
            },
            createdAt : {
                type : Date,
                default : Date.now
            }
        }
    ]
})

//prehooks or mongoose middleware
userSchema.pre('save',function(next){
    //instance operation
    const user=this
    if(user.isNew){
        bcryptjs.genSalt(10)
          .then((salt)=>{
              bcryptjs.hash(user.password,salt)
              .then((encryptedPassword)=>{
                  user.password=encryptedPassword
                  console.log("encryptedPassword",encryptedPassword)
                  next()
              })
          })
          .catch(err => {
            Promise.reject(err)
        })

    }else{
        next()
    }
    
})

//own static method
userSchema.statics.findByCredentials=function(search){
    const User=this
    return User.findOne(search.username ? {username: search.username} : {email: search.email})
                .then((user)=>{
                    if(!user){
                        return Promise.reject('invalid email/password')
                    }else{
                     return bcryptjs.compare(search.password,user.password)
                             .then((result)=>{
                                 if(result){
                                     return Promise.resolve(user)        
                                 }else{
                                     return Promise.reject({notice: 'invalid email/password'})
                                        
                                 }
                             })
                             .catch(err => {
                                return Promise.reject(err)
                            })
                    }
                })
                .catch((err)=>{
                    return Promise.reject(err)
                })

}

//own static method
userSchema.statics.findByToken=function(token){
    const User=this
   
    let tokenData
    try{
        tokenData=jwt.verify(token,'jwt@123')

    }catch(err){
        return Promise.reject(err)
    }
    return User.findOne({
        _id:tokenData._id,
        'tokens.token':token
    })
   
}

//own instance method
userSchema.methods.generateToken=function(){
    const user=this
    const tokenData={
        _id:user._id,
        username:user.username,
        email : user.email,
        createdAt:Number(new Date())
        //role:'admin'//'customer'
    }
    const token=jwt.sign(tokenData,'jwt@123')
    user.tokens.push({
        token
    })
  return user.save()
        .then((userWithToken)=>{
            return Promise.resolve(token)
        })
        .catch((err)=>{
            return Promise.reject(err)
        })
}

const User=mongoose.model('User',userSchema)

module.exports={
    User:User//User
}


