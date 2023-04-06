import { metamask } from '@kayak/metamask';

export const connectionTasks = {
  metamaskApproveConnection: async () => {
    try {
      await metamask.connection.approve();
      return true;
    } catch (e) {
      return false;
    }
  },
  metamaskRejectConnection: async () => {
    try {
      await metamask.connection.approve();
      return true;
    } catch (e) {
      return false;
    }
  }
} as const;
