import type { AccountData, NetworkParams } from '@kayak/metamask';

declare global {
  namespace Cypress {
    interface Chainable {
      /* ====== General Commands ====== */

      metamaskSetup: () => Chainable<boolean>;

      /**
       * @description
       * Disconnects current account from the current site.
       *
       * Yields `true` if the action was successful, `false` otherwise.
       */
      metamaskDisconnect: () => Chainable<boolean>;

      /* ====== Connection Commands ====== */

      /**
       * @description
       * Approves connection to the current site.
       *
       * Yields `true` if the action was successful, `false` otherwise.
       */
      metamaskApproveConnection: () => Chainable<boolean>;

      /**
       * @description
       * Rejects connection to the current site.
       *
       * Yields `true` if the action was successful, `false` otherwise.
       */
      metamaskRejectConnection: () => Chainable<boolean>;

      /* ====== Transaction Commands ====== */

      /**
       * @description
       * Approves current transaction request.
       *
       * Yields `true` if the action was successful, `false` otherwise.
       */
      metamaskApproveTransaction: () => Chainable<boolean>;

      /**
       * @description
       * Rejects current transaction request.
       *
       * Yields `true` if the action was successful, `false` otherwise.
       */
      metamaskRejectTransaction: () => Chainable<boolean>;

      /* ====== Signature Commands ====== */

      /**
       * @description
       * Approves current signature request.
       *
       * It will fail if the extension window is not opened or is not focused.
       */
      metamaskApproveSignature: () => Chainable<boolean>;

      /**
       * @description
       * Rejects current signature request.
       *
       * Yields `true` if the action was successful, `false` otherwise.
       */
      metamaskRejectSignature: () => Chainable<boolean>;

      /* ====== Network Commands ====== */

      /**
       * @description
       * Adds a new network to MetaMask.
       *
       * Yields `true` if the action was successful, `false` otherwise.
       *
       * @param params Network parameters
       * @param params.name Name of the network
       * @param params.rpcUrl RPC URL of the network
       * @param params.chainId Chain ID of the network
       * @param params.currencySymbol Currency symbol of the network
       * @param params.blockExplorerUrl Block explorer URL of the network
       */
      metamaskAddNetwork: (params: NetworkParams) => Chainable<boolean>;

      /**
       * @description
       * Deletes a network by a given name from MetaMask.
       *
       * Yields `true` if the action was successful, `false` otherwise.
       *
       * @param networkName {string} Name of the network to delete
       */
      metamaskDeleteNetwork: (networkName: string) => Chainable<boolean>;

      /**
       * @description
       * Switches to the network with the given name.
       *
       * Yields `true` if the action was successful, `false` otherwise.
       *
       * @param networkName {string} Name of the network to switch to
       */
      metamaskSwitchNetwork: (networkName: string) => Chainable<boolean>;

      /**
       * @description
       * Gets the name of the current network.
       *
       * Yields `string` — the name of the current network.
       */
      metamaskGetNetworkName: () => Chainable<string>;

      /**
       * @description
       * Sets the visibility of the test networks to `true`.
       *
       * Yields `true` if the action was successful, `false` otherwise.
       */
      metamaskShowTestNets: () => Chainable<boolean>;

      /**
       * @description
       * Sets the visibility of the test networks to `false`.
       *
       * Yields `true` if the action was successful, `false` otherwise.
       */
      metamaskHideTestNets: () => Chainable<boolean>;

      /* ====== Account Commands ====== */

      /**
       * @description
       * Adds a new account to MetaMask.
       *
       * Yields `true` if the action was successful, `false` otherwise.
       *
       * if the action was successful, `null` otherwise.
       *
       * @param accountName {string} Name of the account to add
       */
      metamaskAddAccount: (accountName: string) => Chainable<boolean>;

      /**
       * @description
       * Imports an account to MetaMask.
       *
       * Yields `true` if the action was successful, `false` otherwise.
       *
       * if the action was successful, `null` otherwise.
       *
       * @param privateKey {string} Private key of the account to import
       */
      metamaskImportAccount: (privateKey: string) => Chainable<boolean>;

      /**
       * @description
       * Switches to the account with the given name.
       *
       * Yields `true` if the action was successful, `false` otherwise.
       *
       * @param accountName {string} Name of the account to switch to
       */
      metamaskSwitchAccount: (accountName: string) => Chainable<boolean>;

      /**
       * @description
       * Gets the data of the current account.
       *
       * Yields an object with the following properties:
       *
       * - `accountName: string` — name of the account
       * - `accountAddress: string` — address of the account
       *
       * if the action was successful, `null` otherwise.
       */
      metamaskGetAccountData: () => Chainable<AccountData>;
    }
  }
}
