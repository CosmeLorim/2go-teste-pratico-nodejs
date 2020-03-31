const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dateFns = require('date-fns')

const { sequelize, Sequelize } = require('../models/index')
const userModel = require('../models/users')(sequelize, Sequelize)

const { or } = require('sequelize')

const getExpiresTokenMS = ({ days }) => {
  const now = new Date()
  const dateExpiration = dateFns.addDays(now, days)
  return dateExpiration.getTime()
}

/**
 * Efetua login de usuários.
 *
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
    }, process.env.SECRET_KEY, { expiresIn: '7d' })

    res.status(200).send({ success: true, token })

  } catch (error) {
    console.error(error)
    res.status(400).send()
  }
}

/**
 * Efetua login de usuários.
 *
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
 * Efetua login de usuários.
 *
 * @param {Application} application
 * @param {Resquest} request
 * @param {Response} response
 */
exports.finalizeRegistration = async (req, res) => {
  
}

const tokenDecode = (token, secretKey) => new Promise(resolve => {
  jwt.verify(token, secretKey, (err, decoded) => {
    const tokenDecoded = err ? null : decoded
    resolve(tokenDecoded)
  })
})
