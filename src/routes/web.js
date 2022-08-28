import express from 'express';
import authController from '../controllers/authController'
import userController from "../controllers/userController"
import middlewareController from '../controllers/middlewareController'
let router = express.Router();

const initAPIRoute = (app) => {
    router.post('/api/auth-register', authController.register)
    router.post("/api/auth-login", authController.login)

    router.put('/api/update-user/:id', middlewareController.verifyUser, userController.updateUser)
    router.delete('/api/delete-user/:id', middlewareController.verifyUser, userController.deleteUser)
    router.get('/api/get-user/:id', userController.getUser)

    return app.use('/', router)

}

export default initAPIRoute