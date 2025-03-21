"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "./Button"
import { useErrorBoundary } from "react-error-boundary"
import { Copy, ExternalLink, Wallet } from "lucide-react"
import { useWalletStore } from "../utils/store"
import { createCoreWalletClient } from "../../coreViem"
import { networkIDs } from "@avalabs/avalanchejs"

export const ConnectWallet = ({ children, required }: { children: React.ReactNode; required: boolean }) => {
  const {
    setWalletChainId,
    walletEVMAddress,
    setWalletEVMAddress,
    setCoreWalletClient,
    coreWalletClient,
    setAvalancheNetworkID,
    setPChainAddress,
    pChainAddress,
    walletChainId,
    avalancheNetworkID,
  } = useWalletStore()
  const [hasWallet, setHasWallet] = useState<boolean>(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
  const { showBoundary } = useErrorBoundary()

  function handleAccountsChanged(accounts: string[]) {
    if (accounts.length === 0) {
      setWalletEVMAddress("")
      return
    } else if (accounts.length > 1) {
      showBoundary(new Error("Multiple accounts found, we don't support that yet"))
      return
    }

    //re-create wallet with new account
    setCoreWalletClient(createCoreWalletClient(accounts[0] as `0x${string}`))
    setWalletEVMAddress(accounts[0] as `0x${string}`)

    coreWalletClient.getPChainAddress().then(setPChainAddress).catch(showBoundary)

    if (walletChainId === 0) {
      coreWalletClient.getChainId().then(onChainChanged).catch(showBoundary)
    }
  }

  const onChainChanged = (chainId: string | number) => {
    if (typeof chainId === "string") {
      chainId = Number.parseInt(chainId, 16)
    }

    setWalletChainId(chainId)
    coreWalletClient.getPChainAddress().then(setPChainAddress).catch(showBoundary)

    coreWalletClient
      .isTestnet()
      .then((isTestnet) => {
        setAvalancheNetworkID(isTestnet ? networkIDs.FujiID : networkIDs.MainnetID)
      })
      .catch(showBoundary)
  }

  useEffect(() => {
    async function init() {
      try {
        //first, let's check if there is a wallet at all
        if (window.avalanche) {
          setHasWallet(true)
        } else {
          setHasWallet(false)
          return
        }

        window.avalanche?.on("accountsChanged", handleAccountsChanged)
        window.avalanche.on("chainChanged", onChainChanged)

        try {
          const accounts = await window.avalanche?.request<string[]>({ method: "eth_accounts" })
          if (accounts) {
            handleAccountsChanged(accounts)
          }
        } catch (error) {
          //Ignore error, it's expected if the user has not connected their wallet yet
        }
      } catch (error) {
        showBoundary(error)
      }
    }
    init()
  }, [])

  async function connectWallet() {
    console.log("Connecting wallet")
    window.avalanche
      ?.request<string[]>({ method: "eth_requestAccounts" })
      .catch((error) => {
        showBoundary(error)
      })
      .then((accounts?: string[] | void) => {
        if (accounts) {
          handleAccountsChanged(accounts)
        }
      })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 12)}...${address.substring(address.length - 4)}`
  }

  if (required && !hasWallet) {
    return (
      <div className="space-y-4 max-w-md mx-auto">
        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-zinc-800 dark:to-zinc-900 p-6 rounded-2xl shadow-lg border border-red-200 dark:border-zinc-700">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/small-logo.png"
              alt="Avalanche Logo"
              className="h-12 w-auto"
            />
          </div>
          <h3 className="text-xl font-bold text-center text-red-600 dark:text-red-400 mb-3">Core Wallet Required</h3>
          <p className="text-zinc-700 dark:text-zinc-300 text-center mb-6">
            Core wallet is required to interact with Avalanche Builder Hub.
          </p>
          <a
            href="https://chromewebstore.google.com/detail/core-crypto-wallet-nft-ex/agoakfejjabomempkjlepdflaleeobhb"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
          >
            <Button className="w-full bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium py-3.5 px-5 rounded-xl shadow-lg hover:translate-y-[-1px] active:translate-y-[1px] transition-all duration-200 flex items-center justify-center border-b-2 border-red-800/50">
              <ExternalLink className="w-4 h-4 mr-2.5 text-white" />
              Download Core Wallet
            </Button>
          </a>
        </div>
      </div>
    )
  }

  if (required && !walletEVMAddress) {
    return (
      <div className="space-y-4 max-w-md mx-auto">
        <div className="bg-gradient-to-br from-red-50 to-red-100 dark:from-zinc-800 dark:to-zinc-900 p-6 rounded-2xl shadow-lg border border-red-200 dark:border-zinc-700">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/small-logo.png"
              alt="Avalanche Logo"
              className="h-24 w-auto"
            />
          </div>
          <h3 className="text-xl font-bold text-center text-red-600 dark:text-red-400 mb-3">Connect Core</h3>
          <p className="text-zinc-700 dark:text-zinc-300 text-center mb-6">
            Connect your Core wallet to access Avalanche Builder Hub.
          </p>
          <Button
            onClick={connectWallet}
            className="w-full bg-gradient-to-br from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-medium py-3.5 px-5 rounded-xl shadow-lg hover:translate-y-[-1px] active:translate-y-[1px] transition-all duration-200 flex items-center justify-center border-b-2 border-red-800/50"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 transition-all duration-300">
      {walletEVMAddress && (
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-md rounded-xl p-4 relative overflow-hidden">
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent dark:from-red-900/10 dark:to-transparent pointer-events-none"></div>

          {/* Header with logo, wallet info, and badges */}
          <div className="flex items-center justify-between mb-4">
            {/* Wider logo and title section with subtitle underneath */}
            <div className="flex items-start flex-1">
              <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-2.5 mr-3 h-[60px] w-[60px] flex items-center justify-center">
                <img
                  src="/small-logo.png"
                  alt="Avalanche Logo"
                  className="h-8 w-auto"
                />
              </div>
              <div className="flex flex-col justify-center h-[60px]">
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">Avalanche Wallet</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Connected to Core</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Chain indicator */}
              {walletChainId && (
                <div className="flex items-center gap-1.5 bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-full text-xs">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  <span className="text-zinc-700 dark:text-zinc-700 font-medium">Chain {walletChainId}</span>
                </div>
              )}

              {/* Network badge */}
              {avalancheNetworkID && (
                <div
                  className={`px-2.5 py-1 rounded-full text-xs font-medium flex items-center ${
                    avalancheNetworkID === networkIDs.FujiID
                      ? "bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-200"
                      : "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200"
                  }`}
                >
                  <div
                    className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                      avalancheNetworkID === networkIDs.FujiID ? "bg-orange-500" : "bg-green-500"
                    }`}
                  ></div>
                  {avalancheNetworkID === networkIDs.FujiID ? "Testnet" : "Mainnet"}
                </div>
              )}
            </div>
          </div>

          {/* Wallet addresses in a compact format */}
          <div className="space-y-2">
            {/* EVM Address */}
            <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/80 rounded-md p-2.5 border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center">
                <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mr-2">EVM:</span>
                <div className="font-mono text-xs text-zinc-800 dark:text-zinc-200 truncate">
                  {truncateAddress(walletEVMAddress)}
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(walletEVMAddress)}
                className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                title="Copy address"
              >
                <Copy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
              </button>
            </div>

            {/* P-Chain Address */}
            {pChainAddress && (
              <div className="flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/80 rounded-md p-2.5 border border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 mr-2">P-Chain:</span>
                  <div className="font-mono text-xs text-zinc-800 dark:text-zinc-200 truncate">
                    {truncateAddress(pChainAddress)}
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(pChainAddress)}
                  className="p-1.5 rounded-md hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                  title="Copy address"
                >
                  <Copy className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Children content */}
      <div className="transition-all duration-300">{children}</div>
    </div>
  )
}

