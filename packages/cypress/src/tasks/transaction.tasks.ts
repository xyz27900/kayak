import { metamask } from '@kayak/metamask';

export const transactionTasks = {
  metamaskApproveTransaction: async () => {
    try {
      await metamask.transaction.approve();
      return true;
    } catch (error) {
      return false;
    }
  },
  metamaskRejectTransaction: async () => {
    try {
      await metamask.transaction.approve();
      return true;
    } catch (error) {
      return false;
    }
  }
} as const;
