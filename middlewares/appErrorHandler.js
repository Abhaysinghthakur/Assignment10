const response = require('./../libs/responseLib');
const logger = require('./../libs/loggerLib')

let errorHandler = (err,req,res,next) =>{

    logger.error('Error at global lvl','global errorHandler',10);
    let apiResponse = response.generate(true,'some error occured at global lvl',500,null);
    res.send(apiResponse);
}

let notFoundHandler = (req,res,next) =>{

    logger.error('Error at global lvl','global notFoundHandler',0)
    let apiResponse = response.generate(true,'Route not found in application',404,null);
    res.send(apiResponse);
}

module.exports = {
    globalErrorHandler:errorHandler,
    globalNotFoundHandler:notFoundHandler
};