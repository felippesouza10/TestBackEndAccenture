const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { secret } = require('../config/authenticator');

let userSchema = new mongoose.Schema({
    token:     { type: String, require: true },
    ultimo_login: { type: Date, default:  new Date() },
    data_atualizacao: { type: Date, default:  new Date() },
    data_criacao: { type: Date, default:  new Date() },

    nome:     { type: String, required: true },
    email:    { type: String, required: true, unique: true, lowercase: true },
    senha: { type: String, require: true, select: false },
    telefones:    [{
        numero: { type: String },
        ddd:    { type: String }
    }],
    
})

userSchema.pre('save', async function (next) {
    this.token = jwt.sign({ id: this._id }, secret, { expiresIn: 3600000 })
    this.senha = await bcrypt.hash(this.senha, 10)
    
    next()
})

module.exports = mongoose.model('User', userSchema);