const UserController = require('../controllers/user')
const UserModel = require('../models/User')

class SignupController {
  static signupUser(signupData) {
    const { email, password, name, image } = signupData
    const id = Math.floor(4 + Math.random() * 10)
    const newUser = new UserModel(id, name, email, password, image)
    const user = UserController.createUser(newUser)
    return user
  }
}

module.exports = SignupController