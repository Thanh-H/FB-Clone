import User from "../models/User";
import bcrypt from 'bcryptjs'

let updateUserService = async (id, data) => {
    try {
        if (!id || !data) {
            return ({
                status: 404,
                message: {
                    errCode: 1,
                    errMessage: 'Missing parameter'
                }
            })
        }

        else
            if (id === data.id || data.isAdmin === true) {
                const salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash(data.password, salt);
                let updateUser = await User.findByIdAndUpdate(          
                    id,
                    { $set: data },
                    { new: true }
                );
                if (updateUser) {
                    return ({
                        status: 200,
                        message: {
                            errCode: 0,
                            errMessage: 'Account has been update'
                        }
                    })
                } else {
                    return ({
                        status: 400,
                        message: {
                            errCode: 2,
                            errMessage: 'user not found'
                        }
                    })
                }
            } else {
                return ({
                    message: {
                        errCode: 2,
                        errMessage: 'You can update only your account!'
                    }
                })
            }
    } catch (error) {
        return error
    }
}

let deleteUserService = async (id) => {
    try {
        if (!id) {
            return ({
                status: 400,
                message: {
                    errCode: 1,
                    errMessage: 'Missing parameter'
                }
            })
        }
        else {
            await User.findByIdAndDelete(id);
            return ({
                status: 200,
                message: {
                    errCode: 0,
                    errMessage: 'user has been deleted'
                }
            })
        }
    } catch (error) {
        return error
    }
}
let getUserService = async (id) => {
    try {
        if (!id) {
            return ({
                status: 400,
                message: {
                    errCode: 1,
                    errMessage: 'Missing parameter'
                }
            })
        }
        else {
            let user = await User.findById(id);
            if (!user) {
                return ({
                    status: 400,
                    message: {
                        errCode: 2,
                        errMessage: 'User not found'
                    }
                })
            } else {
                let { password, updatedAt, ...others } = user._doc
                return ({
                    status: 200,
                    message: {
                        errCode: 0,
                        data: others
                    }
                })
            }
        }
    } catch (error) {
        return error
    }
}

let getAllUserService = async () => {
    try {
        if (!id) {
            return ({
                status: 400,
                message: {
                    errCode: 1,
                    errMessage: 'Missing parameter'
                }
            })
        }
        else {
            let user = await User.find();
            if (!user) {
                return ({
                    status: 400,
                    message: {
                        errCode: 2,
                        errMessage: 'User not found'
                    }
                })
            } else {
                let { password, updatedAt, ...others } = user._doc
                return ({
                    status: 200,
                    message: {
                        errCode: 0,
                        data: others
                    }
                })
            }
        }
    } catch (error) {
        return error
    }
}
module.exports = {
    updateUserService, deleteUserService, getUserService, getAllUserService
}