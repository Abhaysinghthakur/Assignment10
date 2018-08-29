const express = require('express');
const router = express.Router();
const appController = require("./../controllers/appController");
const appConfig = require("./../config/appConfig")
const auth = require("./../middlewares/auth")


module.exports.setRouter = function(app){

    let baseUrl = appConfig.apiVersion;

    app.get(baseUrl+'/product/all',auth.isAuthenticated,appController.allProducts);
    /**
	 * @api {get} /api/assignment/product/all Get all products
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication(*Admin).(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Products Found Successfully.",
	    "status": 200,
	    "data": [
					{
                        productId:String,
                        name:String,
                        description:String,
                        price:Number
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "No product present",
	    "status": 404,
	    "data": null
	   }
	 */
    app.get(baseUrl+'/product/one/:productId',auth.isAuthenticated,appController.viewOneProduct);
    /**
	 * @api {get} /api/assignment/product/one/:productId Get one product by Id
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication(*Admin).(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} productId The productId should be passed as the URL parameter
     *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "Product found",
	    "status": 200,
	    "data": [
					{
                        productId:String,
                        name:String,
                        description:String,
                        price:Number
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "No product present by this Id",
	    "status": 404,
	    "data": null
	   }
	 */
    app.get(baseUrl+'/user/all',auth.isAuthenticated,appController.allUser);
    /**
	 * @api {get} /api/assignment/user/all Get all users
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication(*Admin).(Send authToken as query parameter, body parameter or as a header)
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "users Found Successfully.",
	    "status": 200,
	    "data": [
					{
                        userId:String,
                        name:String,
                        lastName:String
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "User not found",
	    "status": 404,
	    "data": null
	   }
	 */
    app.get(baseUrl+'/user/cart/:userId',auth.isAuthenticated,appController.userCart);
    /**
	 * @api {get} /api/assignment/user/cart/:userId Get cart products of one user
	 * @apiVersion 0.0.1
	 * @apiGroup read
	 *
	 * @apiParam {String} authToken The token for authentication(*Admin).(Send authToken as query parameter, body parameter or as a header)
     * @apiParam {String} UserId The UserId should be passed as the URL parameter
     *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "cart items",
	    "status": 200,
	    "data": [
					{
                        schemaOf:'Cart'
                        userId:String,
                        productId:String
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "No cart present for this user",
	    "status": 404,
	    "data": null
	   }
	 */
    app.post(baseUrl+'/product/add',auth.isAuthenticated,appController.addProduct);
    /**
	 * @api {post} /api/assignment/product/add To add product to product list.
	 * @apiVersion 0.0.1
	 * @apiGroup add
	 *
	 * @apiParam {String} authToken The token for authentication(*Admin).(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} name name of the product passed as a body parameter(Mandatory).
	 * @apiParam {Number} price price of the product passed as a body parameter(Mandatory).
	 * @apiParam {String} description description of the product passed as a body parameter.
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "product created Successfully",
	    "status": 200,
	    "data": [
			{
                productId:String,
                name:String,
                description:String,
                price:Number
			}
		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "error in product creation",
	    "status": 500,
	    "data": null
	   }
	 */
    app.post(baseUrl+'/user/add',auth.isAuthenticated,appController.addUser);
    /**
	 * @api {post} /api/assignment/user/add To add user to user list.
	 * @apiVersion 0.0.1
	 * @apiGroup add
	 *
	 * @apiParam {String} authToken The token for authentication(*Admin).(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} name name of the user passed as a body parameter(Mandatory).
	 * @apiParam {String} lastName lastName of the user passed as a body parameter.
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "success in user creation",
	    "status": 200,
	    "data": [
			{
				userId:String,
                name:String,
                lastName:String
			}
		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "error in user creation",
	    "status": 500,
	    "data": null
	   }
	 */
    app.post(baseUrl+'/product/delete/:productId',auth.isAuthenticated,appController.deleteProduct);
    /**
	 * @api {post} /api/assignment/product/delete/:productId To remove product from product list.
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication(*Admin).(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId The productId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "product deleted",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.",
	    "status": 500,
	    "data": null
	   }
	 */
    app.post(baseUrl+'/cart/add/:userId/:productId',auth.isAuthenticated,appController.addToCart);
    /**
	 * @api {post} /api/assignment/cart/add/:userId/:productId To add product to cart list of a user.
	 * @apiVersion 0.0.1
	 * @apiGroup add
	 *
	 * @apiParam {String} authToken The token for authentication(*Admin).(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId The productId should be passed as the URL parameter
	 * @apiParam {String} userId The userId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "cart creted successfully",
	    "status": 200,
	    "data": [
			"productId": "VCcgBazmE",
			"userId": "6KREeSfA7",
		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "error in cart addition",
	    "status": 500,
	    "data": null
	   }
	 */
    app.post(baseUrl+'/cart/remove/:userId/:productId',auth.isAuthenticated,appController.removeFromCart);
    /**
	 * @api {post} /api/assignment/cart/remove/:userId/:productId To remove product from cart list of a user.
	 * @apiVersion 0.0.1
	 * @apiGroup delete
	 *
	 * @apiParam {String} authToken The token for authentication(*Admin).(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId The productId should be passed as the URL parameter
	 * @apiParam {String} userId The userId should be passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "items removed",
	    "status": 200,
	    "data": []
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "cart Not Found.",
	    "status": 404,
	    "data": null
	   }
	 */
    app.put(baseUrl+'/product/edit/:productId',auth.isAuthenticated,appController.editProduct);
/**
	 * @api {put} /api/assignment/product/edit/:productId Edit product by productId
	 * @apiVersion 0.0.1
	 * @apiGroup edit
	 *
	 * @apiParam {String} authToken The token for authentication.(Send authToken as query parameter, body parameter or as a header)
	 * @apiParam {String} productId productId of the product passed as the URL parameter
	 *
	 *  @apiSuccessExample {json} Success-Response:
	 *  {
	    "error": false,
	    "message": "product edited",
	    "status": 200,
	    "data": [
					{
						productId:String,
						name:String,
						description:String,
						price:String
					}
	    		]
	    	}
		}
	}
	  @apiErrorExample {json} Error-Response:
	 *
	 * {
	    "error": true,
	    "message": "Error Occured.,
	    "status": 500,
	    "data": null
	   }
	 */
}