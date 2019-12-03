const service = require('../services/users')

const getUser = async (request, response) => {
    try {
        const { id } = request.params
        const { authorization } = request.headers
        if (id) {
            response.send(await service.getUser(authorization, id))
        } else {
            response.send(await service.getUser(authorization))
        }
    } catch (error) {
        response.status(error.status).send({mensagem: error.message})
        return false
    }
}

const saveUser = async (request, response) => {
    try {
        const user = request.body
        const result = await service.saveUser(user)
        response.send(result)
    } catch (error) {
        response.status(error.status).send({mensagem: error.message})
        return false
    }
}

const updateUser = async (request, response) => {
    try {
        const { id } = request.params
        const user = request.body
        const { authorization } = request.headers
        const result = await service.updateUser(id, user, authorization)
        response.send(result)
    } catch (error) {
        response.status(error.status).send({mensagem: error.message})
        return false
    }
}

module.exports = {
    getUser,
    saveUser,
    updateUser
}