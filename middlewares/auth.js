const logger = require('./../libs/loggerLib');
const response = require('./../libs/responseLib');

let isAuthenticated = (req,res,next)=>{
    if(req.query.authToken){
        if(req.query.authToken=='Admin'){
            logger.info('Admin Login','auth middleware',10);
            req.user={firstName:'admin',userId:'admin'};
            next();
        }else{
            logger.error('Authentication Failure:Wrong Token','auth middleware',10);
            let apiResponse = response.generate(true,'Wrong Authentication Token',403,null);
            res.send(apiResponse);
        }
    }else{
        logger.error('Authentication Failure:Token Missing','auth middleware',10);
        let apiResponse = response.generate(true,'Authentication Token Missing',404,null);
        res.send(apiResponse)
    }
}

module.exports = {
    isAuthenticated:isAuthenticated
}