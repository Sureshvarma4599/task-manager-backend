const mongoose = require('mongoose');
const Data = mongoose.model('Data',{
    task:{
        type : String,
        required:true
    },
   completed:{
        type:Boolean,
        default:false
    }
})
module.exports={Data}