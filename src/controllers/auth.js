const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { sequelize, Sequelize } = require('../models/index')
const userModel = require('../models/users')(sequelize, Sequelize)
const { Op } = require('sequelize')

/**
 * @param {Application} application
 * @param {Resquest} request
 * @param {Response} response
 */
exports.signIn = async (req, res) => {
  const { password, login } = req.body
  const responseWithErrorOfCredentials = {
    success: false,
    errors: [
      'Credenciais de login inválidas, por favor tente novamente.'
    ]
  }

  if (typeof login !== 'string' || typeof password !== 'string') return res.send(responseWithErrorOfCredentials)

  try {
    const user = await userModel.findOne({
      where: {
        [Op.or]: [
          { email: { [Op.iLike]: login } },
          { phone: { [Op.iLike]: login } },
          { cpf: { [Op.iLike]: login } },
        ]
      }
    })

    if (!user) return res.send(responseWithErrorOfCredentials)

    const passwordIsCorrect = await bcrypt.compare(password, user.password)
    if (!passwordIsCorrect) return res.send(responseWithErrorOfCredentials)

    const token = jwt.sign({
      id: user.id
    }, process.env.SECRET_KEY)

    res.send({ success: true, token })
  } catch (error) {
    console.error(error)
    res.status(400).send()
  }
}
