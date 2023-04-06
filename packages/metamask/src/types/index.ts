export type NetworkParams = {
  name: string;
  rpcUrl: string;
  chainId: number;
  currencySymbol: string;
  blockExplorerUrl?: string;
}

export type AccountData = {
  accountName: string;
  accountAddress: string;
}
