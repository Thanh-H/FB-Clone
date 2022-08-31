import User from "../models/User";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
const salt = bcrypt.genSaltSync(10);

let registerService = async (data) => {
    try {
        if (!data.userName || !data.password || !data.email) {
            return ({
                status: 401,
                message: {
                    errCode: 1,
                    errMessage: 'missing parameter'
                }
            })
        }
        else {
            let user = await User.findOne({
                email: data.email
            })
            if (user) {
                return ({
                    status: 401,
                    message: {
                        errCode: 2,
                        errMessage: 'email already exists please try another email'
                    }
                })
            } else {
                let hash = bcrypt.hashSync(data.password, salt);
                if (data.role) {
                    let newUser = new User({
                        userName: data.userName,
                        email: data.email,
                        password: hash,
                        isAdmin: data.role
                    });
                    await newUser.save();
                } else {
                    let newUser = new User({
                        userName: data.userName,
                        email: data.email,
                        password: hash,
                    });
                    await newUser.save();
                }

                return ({
                    status: 200,
                    message: {
                        errCode: 0,
                        errMessage: 'User has been created!'
                    }
                })
            }
        }
    } catch (err) {
        return (err)
    }
}

////////////////////////////////////////////////////////////login

let loginService = async (data) => {
    try {
        if (!data.password || !data.email) {
            return ({
                status: 404,
                message: {
                    errCode: 1,
                    errMessage: 'missing parameter'
                }
            })
        }
        else {
            let user = await User.findOne({
                email: data.email
            })
            if (!user) {
                return ({
                    status: 404,
                    message: {
                        errCode: 2,
                        errMessage: 'user not found'
                    }
                })
            }
            else {
                let validPassword = await bcrypt.compare(data.password, user.password)
                if (!validPassword) {
                    return ({
                        status: 400,
                        message: {
                            errCode: 3,
                            errMessage: 'wrong password'
                        }
                    })
                }
                if (validPassword && user) {

                    let accessToken = jwt.sign(
                        { id: user.id, isAdmin: user.isAdmin },
                        process.env.JWT_ACCESS_KEY,
                    )

                    let { password, ...others } = user._doc
                    return ({
                        status: 200,
                        message: {
                            errCode: 0,
                            data: { ...others, accessToken }
                        }
                    })
                }
            }
        }
    } catch (error) {
        return error
    }
}

let logoutService = async (id) => {
    try {
        if (!id) {
            return ({
                status: 400,
                message: {
                    errCode: 1,
                    errMessage: 'Missing parameter'
                }
            })
        } else {
            let user = await User.findById(id)
            if (!user) {
                return ({
                    status: 400,
                    message: {
                        errCode: 2,
                        errMessage: 'User not found'
                    }
                })
            } else {
                return ({
                    status: 200,
                    message: {
                        errCode: 0,
                        errMessage: 'logout succeed!'
                    }
                })
            }
        }
    } catch (error) {
        return error
    }
}


module.exports = {
    registerService, loginService, logoutService
}