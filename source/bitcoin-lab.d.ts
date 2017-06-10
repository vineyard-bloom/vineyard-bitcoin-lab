import { BitcoinServer } from "./bitcoin-server";
import { BitcoinConfig } from "vineyard-bitcoin";
export interface BitcoinLabConfig extends BitcoinConfig {
    walletPath: string;
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
