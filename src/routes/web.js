import express from 'express';
import authController from '../controllers/authController'
import userController from "../controllers/userController"
import middlewareController from '../controllers/middlewareController'
let router = express.Router();

const initAPIRoute = (app) => {
    router.post('/api/auth-register', authController.register)
    router.post("/api/auth-login", authController.login)
    router.post("/api/auth-logout/:id", middlewareController.verifyUser, authController.logout)

    router.put('/api/update-user/:id', middlewareController.verifyUser, userController.updateUser)
    router.delete('/api/delete-user/:id', middlewareController.verifyUser, userController.deleteUser)
    router.get('/api/get-user/:id', middlewareController.verifyUser, userController.getUser)
    router.get('/api/get-all-user', userController.getAllUser)
    router.put('/api/update-userByAdmin/', userController.updateUserByAdmin)

    return app.use('/', router)

}

export default initAPIRoute