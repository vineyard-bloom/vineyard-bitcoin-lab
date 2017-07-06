export declare class BitcoinServer {
    private status;
    private stdout;
    private stderr;
    private childProcess;
    start(conf?: any): Promise<void>;
    stop(): Promise<{}>;
}
