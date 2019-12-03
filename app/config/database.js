const mongoose = require('mongoose')
require('dotenv').config()

  

mongoose.connect('mongodb://localhost/TestBackEndAccenture', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('useCreateIndex', true);

const dataBase = mongoose.connection

dataBase.on('error', console.error)
dataBase.once('open', () => {
    console.log('Connected.')
})

module.exports = dataBase