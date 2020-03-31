module.exports = {
  development: {
    username: 'postgres',
    password: '12345',
    database: '2go',
    host: '127.0.0.1',
    logging: false,
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: '2go',
    host: '127.0.0.1',
    logging: false,
    dialect: 'postgres'
  },
  production: {
    username: 'root',
    password: null,
    database: '2go',
    host: '127.0.0.1',
    logging: false,
    dialect: 'postgres'
  }
}
