const router = require('express').Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs')
const {registerVal, loginVal} = require('../validation')

const jwt = require('jsonwebtoken')


const Joi = require('@hapi/joi')

const schema = Joi.object( {
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required()
})

router.post('/register' , async (req, res) => {
    const {error} = registerVal(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send("Email already exist")

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt)
    
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass
    })
    try{
        const savedUser = await user.save();
        res.send({user: user._id} )
    }catch(err){
        res.status(400).send(err);
    }
})


//Login

router.post('/login', async (req,res) => {
    const {error} = loginVal(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    const validEmail = await User.findOne({email: req.body.email})
    if(!validEmail) return res.status(400).send('Email doesnt exist')

    const validPass = await bcrypt.compare(req.body.password, validEmail.password)
    if(!validPass) return res.status(400).send('password is wrong')

    const token = jwt.sign({_id: validEmail._id}, process.env.TOKEN_SEC)
    res.header('auth-token', token).send(token)

     res.send('Login succes')

})













module.exports = router;