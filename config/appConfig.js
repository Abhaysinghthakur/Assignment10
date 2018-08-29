let appConfig = {};

appConfig.port = 3000;
appConfig.allowedCrossOrigin = "*";
appConfig.env = "dev";
appConfig.db ={
    uri:'mongodb://127.0.0.1:27017/assignment10',
}
appConfig.apiVersion = '/api/assignment';

//export module.
module.exports = {
    port:appConfig.port,
    allowedCrossOrigin:appConfig.allowedCrossOrigin,
    environment:appConfig.env,
    db:appConfig.db,
    apiVersion:appConfig.apiVersion

}//end module exports.