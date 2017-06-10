"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var child_process = require('child_process');
var Status;
(function (Status) {
    Status[Status["inactive"] = 0] = "inactive";
    Status[Status["active"] = 1] = "active";
})(Status || (Status = {}));
var BitcoinServer = (function () {
    function BitcoinServer() {
        this.status = Status.inactive;
    }
    BitcoinServer.prototype.start = function () {
        var childProcess = this.childProcess = child_process.spawn('bitcoind');
        childProcess.stdout.on('data', function (data) {
            console.log("stdout: " + data);
        });
        childProcess.stderr.on('data', function (data) {
            console.error("stderr: " + data);
        });
        childProcess.on('close', function (code) {
            console.log("child process exited with code " + code);
        });
        return Promise.resolve();
    };
    BitcoinServer.prototype.stop = function () {
        var _this = this;
        if (!this.childProcess)
            return Promise.resolve();
        return new Promise(function (resolve, reject) {
            _this.childProcess.kill();
            _this.childProcess.on('close', function (code) {
                resolve();
            });
        });
    };
    return BitcoinServer;
}());
exports.BitcoinServer = BitcoinServer;
//# sourceMappingURL=bitcoin-server.js.map