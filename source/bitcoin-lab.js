"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bitcoin_server_1 = require("./bitcoin-server");
var child_process = require('child_process');
var fs = require('fs');
var rimraf = require('rimraf');
var BitcoinLab = (function () {
    function BitcoinLab(config, server) {
        if (server === void 0) { server = new bitcoin_server_1.BitcoinServer(); }
        this.server = server;
        this.config = config;
    }
    BitcoinLab.prototype.deleteLock = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fs.unlink(_this.config.walletPath + '/' + '.lock', function (result, error, stdout, stderr) {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    };
    BitcoinLab.prototype.deleteWallet = function () {
        var _this = this;
        console.log('Deleting regtest bitcoin wallet');
        return this.deleteLock()
            .then(function () { return new Promise(function (resolve, reject) {
            rimraf(_this.config.walletPath, function (error, stdout, stderr) {
                if (error)
                    reject(error);
                resolve(stdout);
            });
        }); });
    };
    BitcoinLab.prototype.start = function () {
        return this.server.start();
    };
    BitcoinLab.prototype.stop = function () {
        return this.server.stop();
    };
    BitcoinLab.prototype.reset = function () {
        return this.deleteWallet();
        // return this.stop()
        // .then(() => this.deleteWallet())
        // .then(() => this.start())
    };
    return BitcoinLab;
}());
exports.BitcoinLab = BitcoinLab;
//# sourceMappingURL=bitcoin-lab.js.map