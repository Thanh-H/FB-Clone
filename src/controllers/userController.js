import userService from "../service/userService"

let updateUser = async (req, res) => {
    try {
        let id = req.params.id
        let data = req.body
        let message = await userService.updateUserService(id, data)
        return res.status(message.status).json(message.message)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

let deleteUser = async (req, res) => {
    try {
        let message = await userService.deleteUserService(req.params.id)
        return res.status(message.status).json(message.message)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

let getUser = async (req, res) => {
    try {
        let message = await userService.getUserService(req.params.id)
        return res.status(message.status).json(message.message)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

let getAllUser = async (req, res) => {
    try {
        let message = await userService.getAllUserService()
        return res.status(message.status).json(message.message)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}
module.exports = {
    updateUser, deleteUser, getUser, getAllUser
}