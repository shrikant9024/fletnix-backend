const express = require('express')
const router = require('./routes/route')
const { mongo, default: mongoose } = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
require("dotenv").config(); 

const app = express()
const PORT = 8000
app.use(cors())

mongoose.connect(process.env.MONGO_URL).then(()=>console.log('mongodb connected')).catch(err=>console.log('Mongo error',err))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use("/",router)



app.listen(PORT,()=>console.log(`Server is running at ${PORT}`))

