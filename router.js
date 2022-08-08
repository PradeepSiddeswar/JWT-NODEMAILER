const express = require('express')
const router = express.Router()
const Controller = require("./controller")

router.post('/', Controller.create)

// router.post('/logout', Controller.logout)

// router.post('/refresh-token', Controller.refresh)

// router.delete('/verify/:id', Controller.delete)
// router.post('/mailer',Controller.nodemailer)
module.exports = router