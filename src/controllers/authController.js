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
        if (message.message.data && message.message.data.accessToken) {
            let accessToken = ''
            accessToken = message.message.data.accessToken
            res.cookie("Token", accessToken, {
                httpOnly: true,
                secure: false,
                path: "/",
                sameSite: "strict",
            });
        }
        res.status(message.status).json(message.message)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: "-1",
            errMessage: "error from sever"
        })
    }

}

let logout = async (req, res) => {
    try {
        let message = await authService.logoutService(req.params.id)
        return res.status(message.status).json(message.message)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            errCode: "-1",
            errMessage: "error from sever"
        })
    }
}

module.exports = {
    register, login, logout
}