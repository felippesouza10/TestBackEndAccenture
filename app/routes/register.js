const router = require('express').Router()

const controller = require('../controllers/users')

router.post('/', controller.saveUser)

module.exports =  router