import React from "react";
import Layout from "@theme/Layout";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import Card from "../components/Card";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;

  return (
    <Layout title="Homepage" description="Avalanche Dev Docs">
      <main>
        <br />
        <h1 align="center" style={{ fontWeight: "750" }}>
          Welcome to Avalanche Dev Docs
        </h1>
        <section className={styles.features}>
          <div className="container">
            <div className="row cards__container">
              <Card
                to="subnets/build-first-subnet"
                header={{
                  label: "🚀 Launch Your First Subnet",
                }}
                body={{
                  label:
                    "Start your Subnet development journey by creating a subnet in under five minutes",
                }}
              />

              <Card
                to="intro"
                header={{
                  label: "🔺 Learn about Avalanche",
                }}
                body={{
                  label:
                    "Discover how Subnets and Avalanche Consensus are revolutionizing Web3",
                }}
              />

              <Card
                to="nodes"
                header={{
                  label: "😎 Become a Validator",
                }}
                body={{
                  label:
                    "Join Avalanche's Proof-of-Stake protocol to help secure the network and earn rewards",
                }}
              />

              <Card
                to="reference"
                header={{
                  label: "💻 View Avalanche APIs",
                }}
                body={{
                  label:
                    "Access low-level protocol interfaces to build your custom dapp",
                }}
              />

              <Card
                to="dapps/launch-your-ethereum-dapp"
                header={{
                  label: "🛠️ Launch Your Dapp on Avalanche",
                }}
                body={{
                  label:
                    "Learn everything you need to deploy an EVM-compatible smart contract",
                }}
              />

              <Card
                to="https://github.com/ava-labs/hypersdk"
                header={{
                  label: "🛠️ HyperSDK",
                }}
                body={{
                  label:
                    "Opinionated Framework for Building Hyper-Scalable Blockchains on Avalanche",
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
