const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { sequelize, Sequelize } = require('../models/index')
const userModel = require('../models/users')(sequelize, Sequelize)
const { or } = require('sequelize')


/**
 * @param {Application} application
 * @param {Resquest} request
 * @param {Response} response
 */
exports.register = async (req, res) => {
  const { password, email, phone } = req.body

  try {
    const existUser = await userModel.findOne({
      where: or(
        { email },
        { phone },
      )
    })

    if (existUser !== null) {
      return res.status(200).send({
        success: false,
        errors: [
          'E-mail ou telefone já cadastrado.',
        ],
      })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const user = await userModel.create({
      email, password: passwordHash, phone,
    })

    const token = jwt.sign({
      id: user.id
    }, process.env.SECRET_KEY)

    res.status(200).send({ success: true, token })

  } catch (error) {
    console.error(error)
    res.status(400).send()
  }
}

/**
 * @param {Application} application
 * @param {Resquest} request
 * @param {Response} response
 */
exports.validadeCode = async (req, res) => {
  const { token, code } = req.body

  try {
    const tokenDecoded = await tokenDecode(token, process.env.SECRET_KEY)
    const user = userModel.findOne({ where: { id: tokenDecoded.id } })

    if (user === null) {
      return res.status(400).send('Token inválido')
    }

    if (code === '0000') {
      userModel.update(
        { validatedCode: true },
        { where: { id: tokenDecoded.id } },
      )

      return res.status(200).send({
        success: true,
      })
    } else {
      return res.status(200).send({
        success: false,
        errors: [
          'Token inválido.',
        ],
      })
    }

  } catch (error) {
    console.error(error)
    res.status(400).send()
  }
}


/**
 * @param {Application} application
 * @param {Resquest} request
 * @param {Response} response
 */
exports.finalizeRegistration = async (req, res) => {
  const { fullName, birthDate, cpf, token, profilePic } = req.body
  try {
    const tokenDecoded = await tokenDecode(token, process.env.SECRET_KEY)
    const user = userModel.findOne({ where: { id: tokenDecoded.id } })
    if (user === null) {
      return res.status(400).send('Token inválido')
    }

    await userModel.update(
      { fullName, birthDate, cpf, profilePic },
      { where: { id: tokenDecoded.id } },
    )

    res.status(200).send({
      success: true,
    })
  } catch (error) {
    console.error(error)
    res.status(400).send()
  }
}

/**
 * @param {Application} application
 * @param {Resquest} request
 * @param {Response} response
 */
exports.allowedNotifications = async (req, res) => {
  try {
    const tokenDecoded = await tokenDecode(token, process.env.SECRET_KEY)
    const user = userModel.findOne({ where: { id: tokenDecoded.id } })
    if (user === null) {
      return res.status(400).send('Token inválido')
    }

    await userModel.update(
      { allowedNotifications: true },
      { where: { id: tokenDecoded.id } },
    )

    res.status(200).send({
      success: true,
    })
  } catch (error) {
    console.error(error)
    res.status(400).send()
  }
}

const tokenDecode = (token, secretKey) => new Promise(resolve => {
  jwt.verify(token, secretKey, (err, decoded) => {
    const tokenDecoded = err ? null : decoded
    resolve(tokenDecoded)
  })
})
