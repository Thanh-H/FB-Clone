import authService from "../service/authService"

let register = async (req, res) => {
    try {
        let message = await authService.registerService(req.body)
        return res.status(message.status).json(message.message)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: "-1",
            errMessage: "error from sever"
        })
    }

}

let login = async (req, res) => {
    try {
        let message = await authService.loginService(req.body)
        res.cookie("refreshToken", message.refreshToken, {
            httpOnly: true,
            secure: false,
            path: "/",
            sameSite: "strict",
        });
        res.status(message.status).json(message.message)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: "-1",
            errMessage: "error from sever"
        })
    }

}

module.exports = {
    register, login
}