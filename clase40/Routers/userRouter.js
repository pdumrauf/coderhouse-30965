const { Router } = require('express')
const UserController = require('../Controllers/UserController')
const UserService = require('../Services/UserService')
const UserRepository = require('../Repositories/UserRepository')

const userRouterFn = () => {
  const userRepository = new UserRepository()
  const userService = new UserService(userRepository)
  const userController = new UserController(userService)
  
  const userRouter = new Router()
  
  // userRouter.get('/', (req, res) => userController.get(req, res) )
  userRouter.get('/', userController.get.bind(userController))
  userRouter.post('/', userController.post.bind(userController))

  return userRouter

}

module.exports = userRouterFn
