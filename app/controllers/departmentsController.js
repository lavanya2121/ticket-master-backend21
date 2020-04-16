const Department=require('../models/department')

//setup api
//list
module.exports.list=(req,res)=>{
    Department.find({})//query parameter
        .then((departments)=>{
            res.json(departments)
        })
        .catch((err)=>{
            res.json(err)
        })
}

//Create
module.exports.create = (req, res) => {
    const body = req.body
    const department = new Department(body)
    department.user = req.user._id
    department.save()
        .then((department) => {
            res.json({
                //notice: 'successfully created a customer', 
                department
            })
        })
        .catch((err) => {
            res.json(err)
        })
}

//Show
module.exports.show = (req, res) => {
    const id = req.params.id
    Department.findOne({_id: id})
        .then((department) => {
            if (department) {
                res.json(department)
            } 
            else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

//Update/Edit
module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Department.findOneAndUpdate({_id: id}, body, {new: true, runValidators: true})
        .then((department) => {
            if (department) {
                res.json(department)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

//Delete
module.exports.destroy = (req, res) => {
    const id = req.params.id
    Department.findOneAndDelete({_id: id,})
        .then((department) => {
            if (department) {
                res.json(department)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}