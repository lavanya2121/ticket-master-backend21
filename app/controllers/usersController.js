
//const express = require('express')
//const router = express.Router()
const { User } = require('../models/user')
const _ = require('lodash')

//localhost:3040/users/register
module.exports.register = (req,res) => {
    const body = req.body
    const user = new User(body)
    user.save()
    .then((user) => {
        //res.json(_.pick(user,['_id','username','email']))
       res.json(user)
    })
    .catch((err) => {
        res.json(err)
    })
}

//localhost:3040/users/login
module.exports.login = (req,res) => {
    const body = req.body
    const search = {
        email: body.email,
        username: body.username,
        password: body.password
    }
    User.findByCredentials(search)
        .then((user) => {
            //changed
            userInfo = user
            return user.generateToken()
        })
        .then((token) => {
          // res.setHeader('x-auth', token).json({})
          res.json({
               token ,
               //changed
               user : {
                   _id : userInfo._id,
                   email : userInfo.email
               }
           })
        })
        .catch((err) => {
            res.json(err)
        })
    
}

// module.exports.checkLoginStatus = (req, res) => {
//     if (req.user){
//         res.send({notice: 'valid user'})
//     }
// }


//localhost:3040/users/account
module.exports.account = (req,res) => {
    const { user } = req
    //res.json(_.pick(user,['_id','username','email']))
    res.json(user)
}

//localhost:3040/users/logout
module.exports.logout = (req,res) => {
    const { user,token} = req
    console.log("user",req)
    //remove token when logging out
    User.findByIdAndUpdate(user._id, { $pull : { tokens : { token : token}}})
    .then(() => {
        res.json({ notice : 'successfully logged out'})
    })
    .catch((err) => {
        res.json(err)
    })
}

//logout all-to logout from all the devices
module.exports.logoutAll = (req, res) => {
    const {user, token} = req 
    User.findByIdAndUpdate(user._id, { $set: {tokens: []}}, {new: true})
        .then(user => {
            res.send({notice: 'succesfully logged out of all devices'})
        })
}