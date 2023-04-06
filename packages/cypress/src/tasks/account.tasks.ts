import { metamask } from '@kayak/metamask';

export const accountTasks = {
  metamaskAddAccount: async (accountName: string) => {
    try {
      await metamask.account.add(accountName);
      return true;
    } catch (e) {
      return null;
    }
  },
  metamaskImportAccount: async (privateKey: string) => {
    try {
      await metamask.account.import(privateKey);
      return true;
    } catch (e) {
      return null;
    }
  },
  metamaskSwitchAccount: async (accountName: string) => {
    try {
      await metamask.account.switch(accountName);
      return true;
    } catch (e) {
      return false;
    }
  },
  metamaskGetAccountData: async () => {
    try {
      return await metamask.account.getData();
    } catch (e) {
      return null;
    }
  }
} as const;
