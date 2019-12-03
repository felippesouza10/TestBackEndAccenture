const router = require('express').Router()

const controller = require('../controllers/users')
const authMiddleware = require('../middlewares/authenticator')

router.use(authMiddleware)

router.get('/:id', controller.getUser)
router.get('/', controller.getUser)
router.put('/:id', controller.updateUser)

module.exports =  router