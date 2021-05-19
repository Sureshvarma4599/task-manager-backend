const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect('mongodb+srv://system:root@cluster0.27piq.mongodb.net/t?retryWrites=true&w=majority',{
    useCreateIndex:true,
    useFindAndModify:false,
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(ok=>console.log("Database is connected"))
.catch(err=>console.log(err))

module.exports = mongoose 