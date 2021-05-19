const express = require('express');
const router = express.Router();
const bodyParser= require('body-parser');
var ObjectId = require('mongoose').Types.ObjectId;
const {Data} = require('../model/task')


router.post('/',(req,res)=>{
    var data = new Data({
        task:req.body.task,
        completed:req.body.completed,
        
    })
    data.save((err,docs)=>{
        if(!err){
            res.send(docs)
        }
        else{
            console.log(json.stringify(err))
        }
    })
})

router.get('/',(req,res)=>{
    Data.find((err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log(json.stringify(err))
        }
    })
})
router.get('/:id',(req,res)=>{
    Data.findOne((err,doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log(json.stringify(err))
        }
    })
})
router.get('/:task',(req,res)=>{
    console.log(req.params.task)
    console.log(req.params.task)
    var task = req.params.task
    Data.find(task,(err,data)=>{
        if(!err){res.send(data)}
        else{res.send(err)}
    })
})


router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given no : ${req.params.id}`);

    var data =(req.body)
    
    Data.findOneAndUpdate(req.params.id, { $set: data }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Update :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Data.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in  Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});
module.exports=router;