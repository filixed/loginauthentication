const jwt = require('jsonwebtoken')

module.exports = function ( req, res, next){
    const token = req.header('auth-token')
    if(!token) return res.status(401).send('Acces Denied')

    try{
        const verfied = jwt.verify(token, process.env.TOKEN_SEC)
        req.user = verfied;
        next()
    }catch(err){
        res.status(400).send('invalid Token')
    }
}