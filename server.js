'use strict';
var fs = require('fs');
var http = require('http');
var https = require('https');
var app = require('./middlewares/middleware');
var logger = require('./config/logger');
var server =  http.createServer(app);
var commonServices = require('./common/commonServices');


if(commonServices.config.server.ipconfig == 'local'){
    logger.debug(`ipconfig::` +commonServices.config.server.ipconfig);
 var options = {
    // key: fs.readFileSync( './192.168.43.150.key' ),
    // cert: fs.readFileSync( './192.168.43.150.cert' ),
    // requestCert: false,
    // rejectUnauthorized: false
}; 

var sslserver = https.createServer( options, app );

server.listen( 31607, '192.168.0.167' ,function () {
    logger.debug( 'LEH Rest  server listening on port http://192.168.0.167:' + server.address().port );
} ); 

// Start the server.
sslserver.listen(31608,'192.168.0.167', function() {
    logger.debug( 'LEH Rest Secure server listening port https://192.168.0.167:' + sslserver.address().port );
});
} else{

    var options = {
        key: fs.readFileSync( './192.168.0.167.key' ),
        cert: fs.readFileSync( './192.168.0.167.cert' ),
        requestCert: false,
        rejectUnauthorized: false
    }; 
    
    var sslserver = https.createServer( options, app );
    
    server.listen( 31607, '192.168.0.167' ,function () {
        logger.debug( 'LEH Rest  server as remote listening on port http://192.168.0.167:' + server.address().port );
    } ); 
    
    // Start the server.
    sslserver.listen(31608,'192.168.0.167', function() {
        logger.debug( 'LEH Rest Secure server as remote listening port https://192.168.0.167:' + sslserver.address().port );
    });
}