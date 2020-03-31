const { NODE_ENV } = process.env

if (NODE_ENV === 'development') {
  require('dotenv').config({ path: './.env.development' })
}

const application = require(`./config/server.js`)

const PORT = process.env.PORT || 8080

application.listen(PORT, () => {
  console.log(`\n🚀 Online server at the port: ${PORT}, NODE_ENV=${NODE_ENV}`)
})
