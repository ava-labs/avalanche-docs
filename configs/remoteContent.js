// @ts-check

const remoteContent = [
  [
    "docusaurus-plugin-remote-content",
    {
      // docs/build/cross-chain/teleporter/overview.md
      name: "teleporter-overview",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/meaghanfitzgerald/translate-ai/master/policies/",
      documents: ["README.md"],
      outDir: "docs/build/cross-chain/teleporter/",
      // change file name and add metadata
      modifyContent(filename, content) {
        if (filename.includes("README")) {
          return {
            filename: "overview.md",
            content: `---
tags: [Teleporter, Cross-Subnet Communication, Cross-Chain Communication]
description: Teleporter is a messaging protocol built on top of Avalanche Warp Messaging that provides a developer-friendly interface for sending and receiving cross-chain messages from within the EVM.
keywords: [ docs, documentation, avalanche, teleporter, awm, cross-subnet communication, cross-chain, cross-chain communication ]
sidebar_label: Overview
---
              
${content}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      //docs/build/cross-chain/awm/deep-dive.md
      name: "awm-overview",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/avalanchego/v1.10.15/vms/platformvm/warp/",
      documents: ["README.md"],
      outDir: "docs/build/cross-chain/awm/",
      // change file name and add metadata
      modifyContent(filename, content) {
        if (filename.includes("README")) {
          return {
            filename: "deep-dive.md",
            content: `---
tags: [Avalanche Warp Messaging, AWM, Cross-Subnet Communication, Cross-Chain Communication]
description: Avalanche Warp Messaging (AWM) provides a primitive for cross-subnet communication on the Avalanche Network.
keywords: [ docs, documentation, avalanche, awm, cross-subnet communication, cross-chain, cross-chain communication ]
sidebar_label: Deep Dive
---
              
${content}`,
          };
        }
        return undefined;
      },
    },
  ],
];

module.exports = remoteContent;
