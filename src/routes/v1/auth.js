const express = require('express')
const router = express.Router()

const { signIn } = require('../../controllers/auth')

router.post('/api/v1/users/auth/sign-in', async (req, res) => signIn(req, res))

module.exports = router
