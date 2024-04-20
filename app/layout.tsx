"use client";
import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";

import { ThirdwebProvider } from "@thirdweb-dev/react";

import { Link } from "@nextui-org/link";
import clsx from "clsx";
import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { title } from "@/components/primitives";

const { chains, publicClient } = configureChains(
  [sepolia],
  [
    alchemyProvider({ apiKey: process.env.ALCHEMY_ID as string }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "fbd0254e05f3184a5a70e0f44d0cad19",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>

            
{/* addded 3rd web provider client id */}
          <ThirdwebProvider
                clientId={"d864d6bdb29f0bfb8ddc8d6f256d68b1"} 
            >

            <Providers
              themeProps={{ attribute: "class", defaultTheme: "dark" }}
            >
              <div className="relative flex flex-col h-screen">
                <Navbar />

                <main className="container mx-auto max-w-7xl px-6 flex-grow">
                  {children}
                </main>
              </div>
            </Providers>

            </ThirdwebProvider>
{/* newly added */}


          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  );
}
