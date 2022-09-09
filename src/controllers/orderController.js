import orderService from '../service/orderService'
let createNewOrder = async (req, res) => {
    try {
        let message = await orderService.createNewOrderService(req.body)

        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}
let getAllOrders = async (req, res) => {
    try {
        let message = await orderService.getAllOrdersService()
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

let confirmOrder = async (req, res) => {
    try {
        let message = await orderService.confirmOrderService(req.body.id)
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}
let cancelOrder = async (req, res) => {
    try {
        let message = await orderService.cancelOrderService(req.body.id)
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

let deleteOrder = async (req, res) => {
    try {
        let message = await orderService.deleteOrderService(req.params.id)
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}
module.exports = {
    createNewOrder, getAllOrders, confirmOrder, cancelOrder, deleteOrder
}