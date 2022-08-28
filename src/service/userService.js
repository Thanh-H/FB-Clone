import User from "../models/User";
import bcrypt from 'bcryptjs'

let updateUserService = async (id, data) => {
    try {
        if (!id || !data) {
            return ({
                errCode: 1,
                errMessage: 'Missing parameter'
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
                        errCode: 0,
                        errMessage: 'Account has been update'
                    })
                } else {
                    return ({
                        errCode: 2,
                        errMessage: 'user not found'
                    })
                }
            } else {
                return ({
                    errCode: 2,
                    errMessage: 'You can update only your account!'
                })
            }
    } catch (error) {
        return error
    }
}

let deleteUserUserService = async (id) => {
    console.log('ok 2')
    try {
        if (!id) {
            return ({
                errCode: 1,
                errMessage: 'Missing parameter'
            })
        }
        else {
            await User.findByIdAndDelete(id);
            return ({
                errCode: 0,
                errMessage: 'user has been deleted'
            })
        }
    } catch (error) {
        return error
    }
}
let getUserService = (id) => {
    try {

    } catch (error) {
        return error
    }
}
module.exports = {
    updateUserService, deleteUserUserService, getUserService
}