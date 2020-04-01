const express = require('express')
const router = express.Router()

const {
  register,
  validadeCode,
  finalizeRegistration,
  allowedNotifications,
} = require('../../controllers/user')

router.post('/api/v1/users/register', async (req, res) => register(req, res))
router.post('/api/v1/users/validate-code', async (req, res) => validadeCode(req, res))
router.post('/api/v1/users/finalize-registration', async (req, res) => finalizeRegistration(req, res))
router.post('/api/v1/users/allowed-notifications', async (req, res) => allowedNotifications(req, res))

module.exports = router
