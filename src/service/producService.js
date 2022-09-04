import Product from '../models/Product'

let createNewProductService = async (data) => {
    try {
        if (!data.productType || !data.productTitle || !data.arrImage || !data.currentPrice || !data.contentHTML || !data.contentMarkdown) {
            return ({
                errCode: 1,
                errMessage: 'Missing parameter!'
            })
        }
        else
            if (data.productCode) {
                let product = await Product.findOne({
                    productCode: data.productCode
                })
                if (product) {
                    return ({
                        errCode: 2,
                        errMessage: 'productCode is exist'
                    })
                }
                else {
                    let newProduct = await new Product({
                        productType: data.productType,
                        productTitle: data.productTitle,
                        productCode: data.productCode,
                        arrImage: data.arrImage,
                        currentPrice: data.currentPrice,
                        oldPrice: data.oldPrice,
                        arrSize: data.arrSize.split(","),
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        inStock: data.inStock
                    })
                    await newProduct.save()
                    return ({
                        errCode: 0,
                        errMessage: 'New product has been created!'
                    })
                }

            } else {
                let newProduct = await new Product({
                    productType: data.productType,
                    productTitle: data.productTitle,
                    productCode: data.productCode,
                    arrImage: data.arrImage,
                    currentPrice: data.currentPrice,
                    oldPrice: data.oldPrice,
                    arrSize: data.arrSize.split(","),
                    contentHTML: data.contentHTML,
                    contentMarkdown: data.contentMarkdown,
                    inStock: data.inStock
                })
                await newProduct.save()
                return ({
                    errCode: 0,
                    errMessage: 'New product has been created!'
                })
            }

    } catch (error) {
        console.log(error)
        return error

    }

}
let getAllProductsService = async () => {
    try {
        let allProducts = await Product.find()
        if (!allProducts) {
            return ({
                errCode: 2,
                errMessage: 'Product not found'
            })
        }
        else {
            return ({
                errCode: 0,
                data: allProducts
            })
        }
    } catch (error) {
        return error

    }
}
let deleteProductService = async (id) => {
    try {
        if (!id) {
            return ({
                errCode: 1,
                errMessage: 'missing parameter'
            })
        }
        else {
            await Product.findByIdAndDelete(id)
            return ({
                errCode: 0,
                errMessage: 'Product has been deleted'
            })
        }
    } catch (error) {
        console.log(error)
        return (error)
    }
}

let getProductByIdService = async (id) => {
    try {
        if (!id) {
            return ({
                errCode: 1,
                errMessage: 'Missing parameter'
            })
        }
        else {
            let product = await Product.findById(id);
            if (!product) {
                return ({
                    errCode: 2,
                    errMessage: 'Product not found'
                })
            } else {
                return ({
                    errCode: 0,
                    data: product
                })
            }
        }
    } catch (error) {
        return error
    }
}

let updateProductByIdService = async (data) => {
    try {
        if (!data) {
            return ({
                errCode: 1,
                errMessage: 'Missing parameter!'
            })
        }
        else {
            let product = await Product.findById(data.id)
            if (!product) {
                return ({
                    errCode: 2,
                    errMessage: 'Product not found!'
                })
            }
            else {

                let updateProduct = await Product.findByIdAndUpdate(data.id,
                    {
                        productType: data.productType,
                        productTitle: data.productTitle,
                        productCode: data.productCode,
                        arrImage: data.arrImage,
                        currentPrice: data.currentPrice,
                        oldPrice: data.oldPrice,
                        arrSize: data.arrSize.split(","),
                        contentHTML: data.contentHTML,
                        contentMarkdown: data.contentMarkdown,
                        inStock: data.inStock
                    },
                    { new: true })
                if (updateProduct) {
                    return ({
                        errCode: 0,
                        errMessage: "Product has been update"
                    })
                }


            }
        }
    } catch (error) {
        console.log(error)
        return (error)
    }
}
module.exports = {
    createNewProductService,
    getAllProductsService, deleteProductService, getProductByIdService, updateProductByIdService
}