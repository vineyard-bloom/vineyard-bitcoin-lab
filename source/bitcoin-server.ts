const child_process = require('child_process')

enum Status {
  inactive,
  active
}
export class BitcoinServer {
  private status: Status = Status.inactive
  private stdout
  private stderr
  private childProcess

  start() {
    const childProcess = this.childProcess = child_process.spawn('bitcoind')

    childProcess.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    childProcess.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    childProcess.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    })

    return Promise.resolve()
  }

  stop() {
    if (!this.childProcess)
      return Promise.resolve()

    return new Promise((resolve, reject) => {
      this.childProcess.kill()
      this.childProcess.on('close', (code) => {
        resolve()
      })
    })

  }
}