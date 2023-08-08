import React from "react";
import { HomeCard } from "../../components/HomeCard";
import { Container, Grid2, Typography } from "@avalabs/k2-components";

const cardsData = [
  {
    title: "🚀 Launch Your First Subnet",
    body: "Start your Subnet development journey by creating a subnet in under five minutes",
    to: "/build/subnet/hello-subnet",
  },
  {
    title: "🔺 Learn about Avalanche",
    body: "Discover how Subnets and Avalanche Consensus are revolutionizing Web3",
    to: "/intro",
  },
  {
    title: "😎 Become a Validator",
    body: "Join Avalanche's Proof-of-Stake protocol to help secure the network and earn rewards",
    to: "/nodes/validate/add-a-validator",
  },
  {
    title: "💻 View Avalanche APIs",
    body: "Access low-level protocol interfaces to build your custom dapp",
    to: "/reference",
  },
  {
    title: "🛠️ Launch Your Dapp on Avalanche",
    body: "Learn everything you need to deploy an EVM-compatible smart contract",
    to: "/build/dapp/launch-dapp",
  },
  {
    title: "🛠️ HyperSDK",
    body: "Opinionated Framework for Building Hyper-Scalable Blockchains on Avalanche",
    to: "https://github.com/ava-labs/hypersdk",
    isExternalLink: true,
  },
];

export function Home() {
  return (
    <>
      <Typography variant="h3" textAlign="center" sx={{ my: 8 }}>
        Welcome to Avalanche Dev Docs
      </Typography>
      <Container maxWidth="lg" component="section">
        <Grid2 container spacing={2}>
          {cardsData.map((cardData) => (
            <Grid2 xs={1} md={2} lg={4}>
              <HomeCard {...cardData} />
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </>
  );
}
