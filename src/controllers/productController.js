import productService from '../service/producService'

let createNewProduct = async (req, res) => {
    try {
        let message = await productService.createNewProductService(req.body)
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}
let getAllProducts = async (req, res) => {
    try {
        let message = await productService.getAllProductsService()
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}
let deleteProduct = async (req, res) => {
    try {
        let message = await productService.deleteProductService(req.params.id)
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}
let getProductById = async (req, res) => {
    console.log(req.params.id)
    try {
        let message = await productService.getProductByIdService(req.params.id)
        return res.status(200).json(message)
    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'error from server'
        })
    }
}

let updateProductById = async (req, res) => {
    try {
        let message = await productService.updateProductByIdService(req.body)
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
    createNewProduct, getAllProducts, deleteProduct, getProductById, updateProductById
}