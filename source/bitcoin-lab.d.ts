import { BitcoinServer } from "./bitcoin-server";
export interface BitcoinLabConfig {
    walletPath: string;
    executablePath: string;
}
export declare class BitcoinLab {
    server: BitcoinServer;
    config: BitcoinLabConfig;
    constructor(config: BitcoinLabConfig, server?: BitcoinServer);
    private deleteLock();
    deleteWallet(): Promise<any>;
    start(): Promise<any>;
    stop(): Promise<any>;
    reset(): Promise<any>;
}
