import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import Card from "../components/Card";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout title="Homepage" description="Avalanche Documentation">
      <main>
        <br/>
        <h1 align="center" style={{ fontWeight: '750' }}>Welcome to Avalanche Docs</h1>
        <section className={styles.features}>
          <div className="container">
            <div className="row cards__container">
              <Card
                to="subnets/build-first-subnet"
                header={{
                  label: "🚀 Launch Your First Subnet",
                  translateId: "start-building",
                }}
                body={{
                  label:
                    "Start your Subnet development journey by creating a subnet in under five minutes",
                  translateId: "get-started-building",
                }}
              />

              <Card
                to="intro"
                header={{
                  label: "🔺 Learn about Avalanche",
                  translateId: "run-validator",
                }}
                body={{
                  label:
                    "Discover how Subnets and Avalanche Consensus are revolutionizing Web3",
                  translateId: "validate-transactions",
                }}
              />

              <Card
                to="nodes"
                header={{
                  label: "😎 Become a validator",
                  translateId: "create-spl",
                }}
                body={{
                  label:
                    "Join Avalanche's Proof-of-Stake protocol to help secure the network and earn rewards",
                  translateId: "erc-20",
                }}
              />

              <Card
                to="apis/avalanchego"
                header={{
                  label: "💻 View Avalanche APIs",
                  translateId: "integrate-exchange",
                }}
                body={{
                  label:
                    "Access low-level protocol interfaces to build your custom dapp",
                  translateId: "integration-guide",
                }}
              />

              <Card
                to="dapps/launch-your-ethereum-dapp"
                header={{
                  label: "🛠️ Launch Your Dapp on Avalanche",
                  translateId: "manage-wallet",
                }}
                body={{
                  label:
                    "Learn everything you need to deploy an EVM-compatible smart contract",
                  translateId: "wallet-options",
                }}
              />

              <Card
                to="https://core.app"
                header={{
                  label: "🦉 Install Core",
                  translateId: "learn-how",
                }}
                body={{
                  label:
                    "Access your portfolio with a wallet built specifically for subnets on Avalanche",
                  translateId: "high-level",
                }}
              />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export default Home;