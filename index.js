require('./config/db')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv/config');

const auth = require('./routes/auth')


const dataRoute = require('./controller/dataController')
const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send("Connected")
})

app.listen(port,()=>console.log(`Server started at port ${port}`))

app.use('/',auth)
app.use('/data',dataRoute)


