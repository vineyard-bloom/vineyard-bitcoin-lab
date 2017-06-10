import {BitcoinServer} from "./bitcoin-server"
import {BitcoinConfig} from "vineyard-bitcoin"
const child_process = require('child_process')
const fs = require('fs')
const rimraf = require('rimraf')

export interface BitcoinLabConfig extends BitcoinConfig {
  walletPath: string
}

export class BitcoinLab {
  server: BitcoinServer
  config: BitcoinLabConfig

  constructor(config: BitcoinLabConfig, server: BitcoinServer = new BitcoinServer()) {
    this.server = server
    this.config = config;
  }

  private deleteLock(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      fs.unlink(this.config.walletPath + '/' + '.lock', function (result, error, stdout, stderr) {
        if (error)
          reject(error)
        else
          resolve(result)
      })
    })
  }

  deleteWallet(): Promise<any> {
    console.log('Deleting regtest bitcoin wallet')
    return this.deleteLock()
      .then(() => new Promise((resolve, reject) => {
          rimraf(this.config.walletPath, function (error, stdout, stderr) {
            if (error)
              reject(error)

            resolve(stdout)
          })
        })
      )
  }

  start(): Promise<any> {
    return this.server.start()
  }

  stop(): Promise<any> {
    return this.server.stop()
  }

  reset(): Promise<any> {
    return this.deleteWallet()
    // return this.stop()
      // .then(() => this.deleteWallet())
      // .then(() => this.start())
  }

}