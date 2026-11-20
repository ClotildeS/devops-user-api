const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

userRouter

  /**
  * @route POST /user
  * @group User - Operations about users
  * @param {string} username.formData.required - Username of the user
  * @param {string} firstname.formData.required - First name
  * @param {string} lastname.formData.required - Last name
  * @returns {object} 201 - User created successfully
  * @returns {Error} 400 - Invalid user parameters
  */
  .post('/', (req, resp) => {
    userController.create(req.body, (err, res) => {
      let respObj
      if(err) {
        respObj = {
          status: "error",
          msg: err.message
        }
        return resp.status(400).json(respObj)
      }
      respObj = {
        status: "success",
        msg: res
      }
      resp.status(201).json(respObj)
    })
  })

  /**
  * @route GET /user/{username}
  * @group User - Operations about users
  * @param {string} username.path.required - Username of the user
  * @returns {object} 200 - User found successfully
  * @returns {Error} 404 - User not found
  */

  .get('/:username', (req, resp) => {
  const username = req.params.username

  userController.get(username, (err, user) => {
    if (err) {
      return resp.status(404).json({
        status: 'error',
        msg: err.message
      })
    }

    resp.status(200).json({
      status: 'success',
      msg: user
    })
  })
})
module.exports = userRouter
