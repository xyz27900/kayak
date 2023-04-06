import { metamask, NetworkParams } from '@kayak/metamask';

export const networkTasks = {
  metamaskAddNetwork: async (args: NetworkParams) => {
    try {
      await metamask.network.add(args);
      return true;
    } catch (e) {
      return false;
    }
  },
  metamaskDeleteNetwork: async (networkName: string) => {
    try {
      await metamask.network.delete(networkName);
      return true;
    } catch (e) {
      return false;
    }
  },
  metamaskSwitchNetwork: async (networkName: string) => {
    try {
      await metamask.network.switch(networkName);
      return true;
    } catch (e) {
      return false;
    }
  },
  metamaskGetNetworkName: async () => {
    try {
      return await metamask.network.getName();
    } catch (e) {
      return null;
    }
  },
  metamaskShowTestNets: async () => {
    try {
      await metamask.network.toggleTestNetsVisibility(true);
      return true;
    } catch (e) {
      return false;
    }
  },
  metamaskHideTestNets: async () => {
    try {
      await metamask.network.toggleTestNetsVisibility(false);
      return true;
    } catch (e) {
      return false;
    }
  }
} as const;
