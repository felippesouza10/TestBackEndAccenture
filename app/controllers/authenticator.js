const service = require('../services/authenticator')

const authentication = async (request, response) => {
    const { email, senha } = request.body

    try {
        const result = await service.authentication(email, senha)
        response.send(result)
        return true
    } catch (error) {
        response.status(error.status).send({mensagem: error.message})
        return false
    }
}

module.exports = { authentication }