const router = require('express').Router()

const controller = require('../controllers/authenticator')

router.post('/', controller.authentication)

module.exports =  router