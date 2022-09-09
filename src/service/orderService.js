import Order from '../models/Order'
let createNewOrderService = async (data) => {
    if (!data) {
        return ({
            errCode: 1,
            errMessage: 'Missing parameter!'
        })
    }
    else {
        let newOrder = await new Order({
            arrProduct: data.arrProduct,
            nameCustomer: data.nameCustomer,
            emailCustomer: data.emailCustomer,
            phoneNumber: data.phoneNumber,
            address: data.address,
            quantity: data.quantity,
            total: data.total,
            note: data.note
        })
        await newOrder.save()
        return ({
            errCode: 0,
            errMessage: 'Order has been created!'
        })
    }
}
let getAllOrdersService = async () => {
    try {
        let allOrders = await Order.find()
        if (!allOrders) {
            return ({
                errCode: 2,
                errMessage: 'Product not found'
            })
        }
        else {
            return ({
                errCode: 0,
                data: allOrders
            })
        }
    } catch (error) {
        return error
    }
}

let confirmOrderService = async (id) => {
    try {
        if (!id) {
            return ({
                errCode: 1,
                errMessage: 'Missing parameter!'
            })
        } else {
            let confirm = await Order.findByIdAndUpdate(id,
                {
                    status: "confirmed"
                })

            if (confirm)
                return ({
                    errCode: 0,
                    errMessage: 'Order has been confirmed!'
                })
        }

    } catch (error) {
        console.log(error)
        return error
    }
}

let cancelOrderService = async (id) => {
    try {
        if (!id) {
            return ({
                errCode: 1,
                errMessage: 'Missing parameter!'
            })
        } else {
            let confirm = await Order.findByIdAndUpdate(id,
                {
                    status: "cancelled"
                })

            if (confirm)
                return ({
                    errCode: 0,
                    errMessage: 'Order has been confirmed!'
                })
        }

    } catch (error) {
        console.log(error)
        return error
    }
}

let deleteOrderService = async (id) => {
    try {
        if (!id) {
            return ({
                errCode: 1,
                errMessage: 'Missing parameter!'
            })
        } else {
            let confirm = await Order.findByIdAndDelete(id)
            if (confirm)
                return ({
                    errCode: 0,
                    errMessage: 'Order has been deleted!'
                })
        }

    } catch (error) {
        console.log(error)
        return error
    }
}



module.exports = {
    createNewOrderService, getAllOrdersService, confirmOrderService, cancelOrderService,
    deleteOrderService
}