import authService from "../service/authService"

let register = async (req, res) => {
    try {
        let message = await authService.registerService(req.body)
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: "-1",
            errMessage: "error from sever"
        })
    }

}

let login = async (req, res) => {
    try {
        let message = await authService.loginService(req.body)

        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: "-1",
            errMessage: "error from sever"
        })
    }

}

module.exports = {
    register, login
}