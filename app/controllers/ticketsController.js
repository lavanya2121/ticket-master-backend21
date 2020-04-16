
const Customer=require('../models/customer')
const Department=require('../models/department')
const Employee = require('../models/employee')
const Ticket=require('../models/ticket')


//setup api
//List
module.exports.list = (req, res) => {
    Ticket.find({ user:req.user._id }).populate('customer',['_id','name']).populate('department',['_id','name']).populate('employee',['_id','name'])
        .then((tickets) => {
            res.json(tickets)
        })
        .catch((err) => {
            res.json(err)
        })
}

//Show
module.exports.show = (req, res) => {
    const id = req.params.id
    Ticket.findOne({_id:id,user:req.user._id }).populate('customer',['_id','name']).populate('department',['_id','name']).populate('employee',['_id','name'])
         .then((ticket)=>{
            if (ticket) {
              res.json(ticket)
            } else {
            res.json({})
            }
         })
        .catch((err) => {
            res.json(err)
        })
}

//Create
module.exports.create = (req, res) => {
    const body = req.body
    // if (req.file) {
    //     const file = req.file
    //     body.photoPath = file.location
    // }
    const ticket = new Ticket(body)
    //important
    ticket.user = req.user._id
    ticket.save()
        .then((ticket) => {
            //populating Customer
            Customer.findOne({_id:ticket.customer,user:req.user._id}, '_id name')
            .then((customer)=>{
                ticket.customer=customer
                res.json(ticket)
            })
             //populating Department
             Department.findOne({_id:ticket.department,user:req.user._id}, '_id name')
            .then((department)=>{
                ticket.department=department
                res.json(ticket)
            })
               //populating Employee
               Employee.findOne({_id:ticket.employee,user:req.user._id}, '_id name')
               .then((employee)=>{
                ticket.employee=employee
                   res.json(ticket)
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
    Ticket.findOneAndUpdate({_id:id,user:req.user._id,},body,
              {new:true,runValidators:true}).populate('customer',['_id','name']).populate('department',['_id','name']).populate('employee',['_id','name'])
         .then((ticket)=>{
             if(ticket){
                res.json(ticket)
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
    Ticket.findOneAndDelete({_id:id,user:req.user._id})
         .then((ticket)=>{
             if(ticket){
                 res.json(ticket)
             }else{
                 res.json({})
             }
         })
        .catch((err) => {
            res.json(err)
        })
}





