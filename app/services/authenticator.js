const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { secret } = require('../config/authenticator');
const { ERROR, GenericError } = require('../config/constants');

const authentication = async (email, senha) => {

    if (!email || !senha) {
        const { status, message } = ERROR[2]
        throw new GenericError(status, message)
    }

    try {
        const user = await User.findOne({ email }).select('+senha')
        if (!user) {
            const { status, message } = ERROR[2]
            throw new GenericError(status, message)
        }

        if (!await bcrypt.compare(senha, user.senha)) {
            const { status, message } = ERROR[2]
            throw new GenericError(status, message)
        }

        const token = jwt.sign({ id: user._id }, secret, { expiresIn: 3600000 })

        const userUpdated = {
            nome: user.nome,
            email: user.email,
            senha: user.senha,
            telefones: user.telefones,
            lastLogin: new Date(),
            token
        }

        return await User.findOneAndUpdate({ _id: user._id }, { $set: userUpdated })
            .then(result => {
                return {
                    id: result._id,
                    data_criacao: result.data_criacao,
                    data_atualizacao: result.data_atualizacao,
                    ultimo_login: new Date(),
                    token
                }
            })
    } catch (error) {
        const { status, message } = error
        throw new GenericError(status, message)
    }

}

module.exports = { authentication }