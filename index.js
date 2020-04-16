const express=require('express')
const setupDB=require('./config/database')
const router=require('./config/routes')
const cors = require('cors')

const app=express()
const port=3040



//application level middleware
app.use(express.json())
app.use(cors())


setupDB()

app.use('/',router)

app.listen(port,()=>{
    console.log('listening on port',port)
})