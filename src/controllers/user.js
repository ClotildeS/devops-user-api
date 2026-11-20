
const db = require('../dbClient')

module.exports = {
  create: (user, callback) => {
    // Check parameters
    if (!user.username)
      return callback(new Error("Wrong user parameters"), null)

    // Create User schema
    const userObj = {
      firstname: user.firstname,
      lastname: user.lastname,
    }

    // Save to DB
    // TODO check if user already exists
    db.hmset(user.username, userObj, (err, res) => {
      if (err) return callback(err, null)
      callback(null, res)
    })
  },

  get: (username, callback) => {
    db.hgetall(username, (err, user) => {
      if (err) return callback(err, null)

      if (!user) {
        return callback(new Error('User not found'), null)
      }

      callback(null, user)
    })
  },

  update: (user, callback) => {
    if (!user.username) {
      return callback(new Error('Wrong user parameters'), null)
    }

    db.exists(user.username, (err, exists) => {
      if (err) return callback(err, null)

      if (!exists) {
        return callback(new Error('User not found'), null)
      }

      const userObj = {
        firstname: user.firstname,
        lastname: user.lastname
      }

      db.hmset(user.username, userObj, (err, result) => {
        if (err) return callback(err, null)
        callback(null, result)
      })
    })
  },

  delete: (username, callback) => {
    if (!username) {
      return callback(new Error('Wrong user parameters'), null)
    }

    db.del(username, (err, result) => {
      if (err) return callback(err, null)

      if (result === 0) {
        return callback(new Error('User not found'), null)
      }

      callback(null, result)
    })
  }
}
