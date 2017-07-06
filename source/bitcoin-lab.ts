import {BitcoinServer} from "./bitcoin-server"
import {BitcoinClient, satoshisToBitcoin} from "vineyard-bitcoin"
const child_process = require('child_process')
const fs = require('fs')
const rimraf = require('rimraf')

export interface BitcoinLabConfig {
  walletPath: string
}

export class BitcoinLab {
  server: BitcoinServer
  client: BitcoinClient
  config: BitcoinLabConfig

  constructor(config: BitcoinLabConfig, client: BitcoinClient, server: BitcoinServer = new BitcoinServer()) {
    this.config = config
    this.client = client
    this.server = server
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

  start(conf=null): Promise<any> {
    return this.server.start(conf)
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

  generate(blockCount: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.client.getClient().generate(blockCount, (error) => {
        if (error)
          reject(new Error(error));
        else
          resolve()
      })
    })
  }

  send(address: string, amount: number){
    return new Promise<void>((resolve, reject) => {
      this.client.getClient().sendToAddress(address, satoshisToBitcoin(amount), (error) => {
        if (error)
          reject(new Error(error));
        else
          resolve()
      })
    })
  }
}
