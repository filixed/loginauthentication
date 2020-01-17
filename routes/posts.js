const router = require('express').Router();
const verify = require('./verifyToken')
const nodemailer = require('nodemailer')



router.post('/',verify, (req,res) =>{
    var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: req.body.user,
        pass: req.body.pass,        
    }
})
    var mailopt = {
        from: req.body.from,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.text,
    }
    transporter.sendMail(mailopt, function(error, info){
        if(error){      
            var user = req.body.user      
            console.log(user)            
            console.log(error)
        }else{
            console.log('Email sent')
        }
            
        
    })




})

module.exports = router;