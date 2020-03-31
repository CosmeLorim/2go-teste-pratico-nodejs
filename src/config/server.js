const express = require('express')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const enterpriseRoutes = require('../routes/v1/restricted/enterprise')
const authenticationRoutes = require('../routes/v1/auth')
const userRoutes = require('../routes/v1/user')

app.use(enterpriseRoutes)
app.use(authenticationRoutes)
app.use(userRoutes)

module.exports = app
