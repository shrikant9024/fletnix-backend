const express = require('express')
const router = require('./routes/route')
const { mongo, default: mongoose } = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
const PORT = 8000
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/fletnix").then(()=>console.log('mongodb connected')).catch(err=>console.log('Mongo error',err))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use("/",router)



app.listen(PORT,()=>console.log(`Server is running at ${PORT}`))