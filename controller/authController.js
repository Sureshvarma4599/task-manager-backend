const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv/config')


exports.signup = ((req, res) => {
    const { name, password} = req.body

    if (!name || !password ) {
        return res.status(422).json({error:"All fields are neccesary"})
    }

    User.findOne({ name: name })
        .then((user) => {
            if (user) {
                return res.status(422).json({ error: "Email already exists" })
            }
            const newUser = new User(req.body)

            newUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
            newUser.save()
                .then(user => {
                    res.status(200).json({ message: "Signup Successful" })
                })
                .catch(err => {
                    console.log(err);
                })
        })
        .catch(err => console.log(err))
})

exports.signin = ((req, res) => {
    const { name, password } = req.body

    if (!name, !password) {
        return res.status(422).json({ error: "All fields are necessary" })
    }
    User.findOne({ name: name })
        .exec((err, user) => {
            if (err) {
                return res.status(422).json({ error: "Something went wrong" })
            }
            if (user) {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
                    const {_id,name,password}=user
                    res.status(200).json({ token, savedUser: { _id }, message:"Signed In Successfully" })
                }
                else {
                    return res.status(422).json({ message: "Invalid Password" })
                }
            }
            else {
                return res.status(422).json({ message: "Email id dont exist" })
            }
        })
})

