const Joi = require('@hapi/joi')

const registerVal  = (data) => {
    const schema = Joi.object( {
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    return schema.validate(data)
}

const loginVal  = (data) => {
    const schema = Joi.object( {
        email: Joi.string().required().email(),
        password: Joi.string().required()
    })
    return schema.validate(data)
}

module.exports.registerVal = registerVal
module.exports.loginVal = loginVal