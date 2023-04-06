import { metamask } from '@kayak/metamask';

export const signatureTasks = {
  metamaskApproveSignature: async () => {
    try {
      await metamask.signature.approve();
      return true;
    } catch (error) {
      return false;
    }
  },
  metamaskRejectSignature: async () => {
    try {
      await metamask.signature.reject();
      return true;
    } catch (error) {
      return false;
    }
  }
} as const;
