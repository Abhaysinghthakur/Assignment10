// Controller File contains logic.
const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib');
const check = require('./../libs/checkLib')



const product = mongoose.model('Product');
const user = mongoose.model('User');
const cart = mongoose.model('Cart');



let allProducts = (req, res) => { 
    product.find((err, result) => {
        if (err) {
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            console.log('products is empty')
            let apiResponse = response.generate(true, 'no product present', 404, null)
            res.send(apiResponse)
        } else {
            logger.info("products found successfully", "appController:allproducts", 5)
            let apiResponse = response.generate(false, 'Products Found Successfully.', 200, result)
            res.send(apiResponse)
        }
    })
};

let viewOneProduct = (req, res) => { 
    if(check.isEmpty(req.params.productId)){
        logger.error('productId missing','appController:viewOneProduct',2);
        let apiResponse = response.generate(true,'productId missing',403,null);
        res.send(apiResponse); 
    }else{
        product.findOne({'productId':req.params.productId,'schemaOf':'product'},(err,result)=>{
            if(err){
                logger.error('error in DB','appController:viewOneProduct',2);
                let apiResponse = response.generate(true,'Database error',500,null);
                res.send(apiResponse);
            }else if(check.isEmpty(result)){
                logger.error('no product found by this Id','appController:viewOneProduct',2);
                let apiResponse = response.generate(true,'no product by this Id',404,null);
                res.send(apiResponse);
            }else{
                let apiResponse = response.generate(false,'Product found',200,result);
                res.send(apiResponse);
            }
        })
    }
 };

let addProduct = (req, res) => {

    let productCreation = new Promise((resolve, reject) => {
        if (check.isEmpty(req.body.name)||check.isEmpty(req.body.price)) {
            logger.error('Required Params not passed', 'error in product creation', 1);
            let apiResponse = response.generate(true, 'Params are missing', 403, null);
            reject(apiResponse);
        } else {
            let productId = shortid.generate();
            let description = (req.body.description)?req.body.description:'none';
            let productData = new product({
                productId: productId,
                name: req.body.name,
                price:req.body.price,
                description:description
            })

            productData.save((err, result) => {
                if (err) {
                    logger.error('error in product creation' + err, 'under productData in Data base', 10);
                    let apiResponse = response.generate(true, 'error in product creation', 500, null);
                    reject(apiResponse)
                } else {
                    logger.info('success in product creation', 'Database', 0);
                    resolve(result);
                }
            })
        }

    })//end of promise

    productCreation.then((result) => {
        let apiResponse = response.generate(false, 'product created sucessfully', 200, result);
        res.send(apiResponse);
    })
    .catch((error) => {
        logger.error(error, 'Database', 10);
        res.send(error);
    })
};

let editProduct = (req, res) => {
    if(check.isEmpty(req.params.productId)){
        logger.error('product Id not found','appController:editProduct',2)
        let apiResponse = response.generate(true,'product Id not found',403,null);
        res.send(apiResponse);
    }else{
        let options = req.body;
        console.log(options);
        product.update({'productId':req.params.productId},options,{multi:true},(err,result)=>{
            if(err){
                logger.error(`Error Occured : ${err}`, 'Database', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            }else if(check.isEmpty(result)){
                logger.error(`product not found: ${err}`, 'appcontroller:editproduct', 10);
                let apiResponse = response.generate(true, 'Product not found by Id', 500, null);
                res.send(apiResponse);
            }else{
                logger.info('product edited','appcontroller:editproduct',5);
                let apiResponse = response.generate(false,'product edited',200,result);
                res.send(apiResponse);
            }
        })
    }
};

let deleteProduct = (req, res) => {
    if(check.isEmpty(req.params.productId)){
        logger.error('product Id not found','appController:deleteProduct',2)
        let apiResponse = response.generate(true,'product Id not found',403,null);
        res.send(apiResponse);
    }else{
        product.remove({'productId':req.params.productId,'schemaOf':'product'},(err,result)=>{
            if(err){
                logger.error(`Error Occured : ${err}`, 'Database:appcontroller:deleteProduct', 10)
                let apiResponse = response.generate(true, 'Error Occured.', 500, null)
                res.send(apiResponse)
            }else if(check.isEmpty(result)){
                logger.error(`product not found: ${err}`, 'appcontroller:editproduct', 10);
                let apiResponse = response.generate(true, 'Product not found by Id', 500, null);
                res.send(apiResponse);
            }else{
                logger.info('product deleted','appcontroller:editproduct',5);
                let apiResponse = response.generate(false,'product deleted',200,result);
                res.send(apiResponse);
            }
        })
    }
 };

let addToCart = (req, res) => {
    if(check.isEmpty(req.params.userId)||check.isEmpty(req.params.productId)){
        logger.error('params not present','appController:addToCart',2);
        let apiResponse = response.generate(true,'parameters are missing',403,null);
        res.send(apiResponse);
    }else{
        let cartData = new cart({
            productId:req.params.productId,
            userId:req.params.userId
        })

        product.findOne({'productId':req.params.productId,'schemaOf':'product'},(err, result) => {
            if (err||check.isEmpty(result)) {
                logger.error('no product by this ID' + err, 'appController:addToCart', 10);
                let apiResponse = response.generate(true, 'error in finding product', 500, null);
                res.send(apiResponse);
            } else {
                user.findOne({'userId':req.params.userId,'schemaOf':'user'},(err,result)=>{
                    if (err||check.isEmpty(result)) {
                        logger.error('no user by this ID' + err, 'appController:addToCart', 10);
                        let apiResponse = response.generate(true, 'error in finding user', 500, null);
                        res.send(apiResponse);
                    } else {
                        cartData.save((err,result)=>{
                            if (err) {
                                logger.error('error in cart addition' + err, 'appController:addtocart', 10);
                                let apiResponse = response.generate(true, 'error in cart creation', 500, null);
                                res.send(apiResponse)
                            } else {
                                logger.info('success in cart addtion', 'Database', 0);
                                let apiResponse = response.generate(false, 'cart created sucessfully', 200, result);
                                res.send(apiResponse);
                            }
                        })
                    }
                })
            }
        })
    }
};

let removeFromCart = (req, res) => { 
    if(check.isEmpty(req.params.userId)||check.isEmpty(req.params.productId)){
        logger.error('params not present','appController:addToCart',2);
        let apiResponse = response.generate(true,'parameters are missing',403,null);
        res.send(apiResponse);
    }else{
        cart.remove({'userId':req.params.userId,'productId':req.params.productId},(err,result)=>{
            if(err){
                logger.error('error in removing cart','Database:appController:removeFromCart',5);
                let apiResponse = response.generate(true,'error in removind Cart',403,null);
                res.send(apiResponse);
            }else if (check.isEmpty(result)) {
                console.log('cart Not Found.')
                let apiResponse = response.generate(true, 'cart Not Found.', 404, null)
                res.send(apiResponse)
            }else{
                logger.info('Item removed','Database:appController:removeFromCart',null);
                let apiResponse = response.generate(false,'items Removed',200,null);
                res.send(apiResponse);
            }
        })
    }
 };

let addUser = (req, res) => {
    let userCreation = new Promise({'schemaOf':'product'},(resolve, reject) => {
        if (check.isEmpty(req.body.name)) {
            logger.error('Name not passed', 'error inuser creation', 1);
            let apiResponse = response.generate(true, 'Name is missing', 403, null);
            reject(apiResponse);
        } else {
            let userId = shortid.generate();

            let userData = new user({
                userId: userId,
                name: req.body.name
            })

            userData.save((err, result) => {
                if (err) {
                    logger.error('error in user creation' + err, 'under userData in Data base', 10);
                    let apiResponse = response.generate(true, 'error in user creation', 500, null);
                    reject(apiResponse)
                } else {
                    logger.info('success in user creation', 'Database', 0);
                    resolve(result);
                }
            })
        }

    })//end of promise

    userCreation.then((result) => {
        let apiResponse = response.generate(false, 'user created sucessfully', 200, result);
        res.send(apiResponse);
    })
        .catch((error) => {
            logger.error(error, 'Data base', 10);
            res.send(error);
        })
};//end of addUser

let allUser = (req, res) => {
    user.find({ 'schemaOf':'user'},(err, result) => {
        if (err) {
            logger.error(`Error Occured : ${err}`, 'Database', 10)
            let apiResponse = response.generate(true, 'Error Occured.', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            console.log('Users Not Found.')
            let apiResponse = response.generate(true, 'Users Not Found', 404, null)
            res.send(apiResponse)
        } else {
            logger.info("users found successfully", "appController:allUser", 5)
            let apiResponse = response.generate(false, 'users Found Successfully.', 200, result)
            res.send(apiResponse)
        }
    })
};

let userCart = (req, res) => {
    if(check.isEmpty(req.params.userId)){
        logger.error('no userId passed','appController:userCart',5);
        let apiResponse = response.generate(true,'user Id missing',403,null);
        res.send(apiResponse)
    }else{
        cart.find({'userId':req.params.userId,'schemaOf':'cart'},(err,result)=>{
            if(err){
                logger.error('error in retrieving cart items','Database:appController:userCart',10);
                let apiResponse = response.generate(true,'Databse error',500,null);
                res.send(apiResponse);  
            }else if(check.isEmpty(result)){
                logger.error('no cart items present','Database:appController:userCart',10);
                let apiResponse = response.generate(false,'no cart found for this user ',404,null);
                res.send(apiResponse);
            }else{
                logger.info('cart items present','Database:appController:userCart',10);
                let apiResponse = response.generate(false,'cart items',200,result);
                res.send(apiResponse);
            }
        })
    }
 };


module.exports = {
    allProducts: allProducts,
    viewOneProduct: viewOneProduct,
    addProduct: addProduct,
    editProduct: editProduct,
    deleteProduct: deleteProduct,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    allUser: allUser,
    addUser: addUser,
    userCart: userCart
}