
const { User } = require('../models/user')

const authenticateUser = function(req,res,next){
  
    const token = req.header('x-auth')
     User.findByToken(token)
        .then((user) => {
            if(user){//if the user is a active user
                req.user = user
                req.token = token
                next()
            } else {//if there is an error
                res.status('401').json({notice :'token is not avaliable'})
            }
        })
        .catch((err) => {
            res.status('401').json(err)
        })
}

module.exports = {
    authenticateUser
}