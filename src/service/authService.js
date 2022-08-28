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
                errCode: 1,
                errMessage: 'missing parameter'
            })
        }
        else {
            let hash = bcrypt.hashSync(data.password, salt);
            let newUser = new User({
                userName: data.userName,
                email: data.email,
                password: hash,
            });
            await newUser.save();
            return ({
                errCode: 0,
                errMessage: 'User has been created!'
            })
        }
    } catch (err) {
        return (err)
    }
}

let loginService = async (data) => {
    try {
        if (!data.password || !data.email) {
            return ({
                errCode: 1,
                errMessage: 'missing parameter'
            })
        }
        else {
            let user = await User.findOne({
                email: data.email
            })
            if (!user) {
                return ({
                    errCode: 2,
                    errMessage: 'user not found'
                })
            }
            else {
                let validPassword = await bcrypt.compare(data.password, user.password)
                if (!validPassword) {
                    return ({
                        errCode: 3,
                        errMessage: 'wrong password'
                    })
                }
                if (validPassword && user) {
                    let accessToken = jwt.sign(
                        {
                            id: user.id,
                            isAdmin: user.isAdmin
                        },
                        process.env.JWT_ACCESS_KEY,
                        { expiresIn: "30d" }
                    )
                    let { password, ...others } = user._doc
                    return ({
                        errCode: 0,
                        data: others, accessToken
                    })
                }
            }
        }
    } catch (error) {
        return error
    }
}





module.exports = {
    registerService, loginService
}