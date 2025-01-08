/** @format */

import React, { useMemo } from "react";

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
  PhantomWalletAdapter,
  UnsafeBurnerWalletAdapter,
  LedgerWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  CoinbaseWalletAdapter,
  GlowWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { Buffer } from "buffer";
window.Buffer = window.Buffer || Buffer;

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

const devnet = false;
export const endpoint = devnet
  ? "https://api.devnet.solana.com"
  : "https://solana-mainnet.g.alchemy.com/v2/sOfAQtuDh-PEBYZfyupDI_sQ3kgd9cOC";


export const Wallet = ({ children }) => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Mainnet;

  // const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {/* <App /> */}
          {children}
          {/* Your app's components go here, nested within the context providers. */}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
