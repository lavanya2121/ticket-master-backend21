//lots of changes are done in Notes Controller
const Employee = require('../models/employee')
const Department=require('../models/department')


//setup api
//List
module.exports.list = (req, res) => {
    Employee.find({ user:req.user._id }).populate('department',['_id','name'])
        .then((employees) => {
            res.json(employees)
        })
        .catch((err) => {
            res.json(err)
        })
}

//Show
module.exports.show = (req, res) => {
    const id = req.params.id
    Employee.findOne({_id:id,user:req.user._id }).populate('department',['_id','name'])
         .then((employee)=>{
            if (employee) {
              res.json(employee)
            } else {
            res.json({})
            }
         })
        .catch((err) => {
            res.json(err)
        })
}

//changes done
//Create
module.exports.create = (req, res) => {
    const body = req.body
    // if (req.file) {
    //     const file = req.file
    //     body.photoPath = file.location
    // }
    const employee = new Employee(body)
    //important
    employee.user = req.user._id
    employee.save()
        .then((employee) => {
             //populating Department
             Department.findOne({_id:employee.department,user:req.user._id}, '_id name')
            .then((department)=>{
                employee.department=department
                res.json(employee)
            })
        .catch((err) => {
            res.json(err)
        })
    })
    .catch((err)=>{
        res.json(err)
    })
}

//Update
module.exports.update = (req, res) => {
    const id = req.params.id
    const body = req.body
    Employee.findOneAndUpdate({_id:id,user:req.user._id,},body,
              {new:true,runValidators:true}).populate('department',['_id','name'])
         .then((employee)=>{
             if(employee){
                res.json(employee)
             }else{
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
    Employee.findOneAndDelete({_id:id,user:req.user._id})
         .then((employee)=>{
             if(employee){
                 res.json(employee)
             }else{
                 res.json({})
             }
         })
        .catch((err) => {
            res.json(err)
        })
}





