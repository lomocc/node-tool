var net = require('net');
module.exports = function(port) {
    return new Promise(function (resolve, reject) {
        testPort();

        function testPort() {
            if(port > 65535){
                console.error("no port available!");
                reject();
                return;
            }
            var server = net.createServer();
            server.on('error', function(err) {
                port ++;
                testPort();
            });
            server.unref();
            server.listen(port, function () {
                server.close(function () {
                    resolve(port);
                });
            })
        }
    });
};