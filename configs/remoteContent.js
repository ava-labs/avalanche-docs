// @ts-check

// FOR A GUIDE ON THIS FILE, PLEASE SEE: editing-guides/remote-github-content-guide.md

// Function to replace relative links with absolute links
function replaceRelativeLinks(content, sourceBaseUrl) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)|<img[^>]*src=['"]([^'"]*)['"]/g;

  // Replace both markdown-style links and img src attributes with absolute links
  const updatedContent = content.replace(
    linkRegex,
    (match, text, markdownLink, imgSrc) => {
      if (markdownLink) {
        if (
          markdownLink.startsWith("http") ||
          markdownLink.startsWith("#") ||
          markdownLink.startsWith("mailto:")
        ) {
          // Skip absolute links and anchors
          return match;
        }

        // Convert markdown-style relative link to absolute link
        return `[${text}](${new URL(markdownLink, sourceBaseUrl).href})`;
      } else if (imgSrc) {
        if (imgSrc.startsWith("http") || imgSrc.startsWith("data:")) {
          // Skip absolute links and data URIs
          return match;
        }

        // Convert img src attribute relative link to absolute link
        return `<img src="${new URL(imgSrc, sourceBaseUrl).href}"`;
      }

      return match;
    }
  );

  return updatedContent;
}

// Function to insert lines after the first line of Teleporter docs (for Academy course)
function insertLinesAfterFirstLine(content, newLines) {
    let lines = content.split('\n');
  
    if (newLines.length > 0 && lines.length > 0) {
        lines.splice(1, 0, ...newLines);
    }

    return lines.join('\n');
}

let newLines = [`
:::info 
Dive deeper into Teleporter and kickstart your journey in building cross-chain dApps by enrolling in our [<ins>Teleporter course</ins>](https://academy.avax.network/course/teleporter).
:::
`];

const remoteContent = [
  [
    "docusaurus-plugin-remote-content",
    {
      //docs/build/cross-chain/awm/deep-dive.md
      name: "awm-overview",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/avalanchego/master/vms/platformvm/warp/",
      documents: ["README.md"],
      outDir: "docs/build/cross-chain/awm/",
      // change file name and add metadata
      modifyContent(filename, content) {
        if (filename.includes("README")) {
          const updatedContent = replaceRelativeLinks(
            content,
            "https://github.com/ava-labs/avalanchego/tree/master/vms/platformvm/warp/"
          );
          return {
            filename: "deep-dive.md",
            content: `---
tags: [Avalanche Warp Messaging, AWM, Cross-Subnet Communication, Cross-Chain Communication]
description: Avalanche Warp Messaging (AWM) provides a primitive for cross-subnet communication on the Avalanche Network.
keywords: [ docs, documentation, avalanche, awm, cross-subnet communication, cross-chain, cross-chain communication ]
sidebar_label: Deep Dive
sidebar_position: 1
---
              
${updatedContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/build/cross-chain/teleporter/overview.md
      name: "teleporter-overview",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/teleporter/main/contracts/src/Teleporter/",
      documents: ["README.md"],
      outDir: "docs/build/cross-chain/teleporter/",
      // change file name and add metadata correct links
      modifyContent(filename, content) {
        if (filename.includes("README")) {
          const updatedContent = replaceRelativeLinks(
            content,
            "https://github.com/ava-labs/teleporter/blob/main/contracts/src/Teleporter/"
          );

          const newContent = insertLinesAfterFirstLine(updatedContent, newLines);

          return {
            filename: "overview.md",
            content: `---
tags: [Teleporter, Cross-Subnet Communication, Cross-Chain Communication]
description: Teleporter is a messaging protocol built on top of Avalanche Warp Messaging that provides a developer-friendly interface for sending and receiving cross-chain messages from within the EVM.
keywords: [ docs, documentation, avalanche, teleporter, awm, cross-subnet communication, cross-chain, cross-chain communication ]
sidebar_label: Overview
sidebar_position: 1
---

${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/build/cross-chain/teleporter/deep-dive.md
      name: "teleporter-deep-dive",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/teleporter/main/",
      documents: ["README.md"],
      outDir: "docs/build/cross-chain/teleporter/",
      // change file name and add metadata correct links
      modifyContent(filename, content) {
        if (filename.includes("README")) {
          const updatedContent = replaceRelativeLinks(
            content,
            "https://github.com/ava-labs/teleporter/blob/main/"
          );

          const newContent = insertLinesAfterFirstLine(updatedContent, newLines);

          return {
            filename: "deep-dive.md",
            content: `---
tags: [Teleporter, Cross-Subnet Communication, Cross-Chain Communication]
description: Teleporter is an EVM compatible cross-subnet communication protocol built on top of Avalanche Warp Messaging (AWM), and implemented as a Solidity smart contract. It provides a mechanism to asynchronously invoke smart contract functions on other EVM blockchains within Avalanche. Teleporter provides a handful of useful features on top of AWM, such as specifying relayer incentives for message delivery, replay protection, message delivery and execution retries, and a standard interface for sending and receiving messages within a dApp deployed across multiple subnets.
keywords: [ docs, documentation, avalanche, teleporter, awm, cross-subnet communication, cross-chain, cross-chain communication ]
sidebar_label: Deep Dive
sidebar_position: 2
title: Teleporter Deep Dive
---

${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/build/cross-chain/teleporter/examples.md
      name: "hello-teleporter",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/teleporter/main/contracts/src/CrossChainApplications/",
      documents: ["GETTING_STARTED.md"],
      outDir: "docs/build/cross-chain/teleporter/",
      // change file name and add metadata correct links
      modifyContent(filename, content) {
        if (filename.includes("GETTING_STARTED")) {
          const updatedContent = replaceRelativeLinks(
            content,
            "https://github.com/ava-labs/teleporter/blob/main/contracts/src/CrossChainApplications/"
          );

          const newContent = insertLinesAfterFirstLine(updatedContent, newLines);

          return {
            filename: "getting-started.md",
            content: `---
tags: [Teleporter, Cross-Subnet Communication, Cross-Chain Communication]
description: Teleporter is an EVM-compatible cross-subnet communication protocol built on top of Avalanche Warp Messaging.This section walks through how to build an example cross-chain application on top of the Avalanche Teleporter Protocol.
keywords: [ docs, documentation, avalanche, teleporter, awm, cross-subnet communication, cross-chain, cross-chain communication ]
sidebar_label: Getting Started
sidebar_position: 3
---

${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/build/cross-chain/teleporter/examples.md
      name: "teleporter-example-applications",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/teleporter/main/contracts/src/CrossChainApplications/",
      documents: ["README.md"],
      outDir: "docs/build/cross-chain/teleporter/",
      // change file name and add metadata correct links
      modifyContent(filename, content) {
        if (filename.includes("README")) {
          const updatedContent = replaceRelativeLinks(
            content,
            "https://github.com/ava-labs/teleporter/blob/main/contracts/src/CrossChainApplications/"
          );

          const newContent = insertLinesAfterFirstLine(updatedContent, newLines);

          return {
            filename: "examples.md",
            content: `---
tags: [Teleporter, Cross-Subnet Communication, Cross-Chain Communication]
description: Teleporter is an EVM-compatible cross-subnet communication protocol built on top of Avalanche Warp Messaging. This directory includes cross-chain applications that are built on top of the Teleporter protocol.
keywords: [ docs, documentation, avalanche, teleporter, awm, cross-subnet communication, cross-chain, cross-chain communication ]
sidebar_label: Example Applications
sidebar_position: 4
---

${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/build/cross-chain/teleporter/examples.md
      name: "teleporter-cli",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/teleporter/main/cmd/teleporter-cli/",
      documents: ["README.md"],
      outDir: "docs/build/cross-chain/teleporter/",
      // change file name and add metadata correct links
      modifyContent(filename, content) {
        if (filename.includes("README")) {
          const updatedContent = replaceRelativeLinks(
            content,
            "https://github.com/ava-labs/teleporter/blob/main/cmd/teleporter-cli/README.md"
          );

          const newContent = insertLinesAfterFirstLine(updatedContent, newLines);

          return {
            filename: "cli.md",
            content: `---
tags: [Teleporter, Cross-Subnet Communication, Cross-Chain Communication]
description: This page the source code for the Avalanche Teleporter CLI. The CLI is a command line interface for interacting with the Teleporter contracts. It is written with [cobra](https://github.com/spf13/cobra) commands as a Go application.
keywords: [ docs, documentation, avalanche, teleporter, awm, cross-subnet communication, cross-chain, cross-chain communication, teleporter cli ]
sidebar_label: CLI
sidebar_position: 6
---

${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/build/cross-chain/teleporter/examples.md
      name: "teleporter-upgradeability",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/teleporter/main/contracts/src/Teleporter/upgrades/",
      documents: ["README.md"],
      outDir: "docs/build/cross-chain/teleporter/",
      // change file name and add metadata correct links
      modifyContent(filename, content) {
        if (filename.includes("README")) {
          const updatedContent = replaceRelativeLinks(
            content,
            "https://github.com/ava-labs/teleporter/blob/main/contracts/src/Teleporter/upgrades/"
          );

          const newContent = insertLinesAfterFirstLine(updatedContent, newLines);

          return {
            filename: "upgradeability.md",
            content: `---
tags: [Teleporter, Cross-Subnet Communication, Cross-Chain Communication]
description: Teleporter is an EVM-compatible cross-subnet communication protocol built on top of Avalanche Warp Messaging. The TeleporterMessenger contract is non-upgradable, once a version of the contract is deployed it cannot be changed. However, there could still be new versions of TeleporterMessenger contracts needed to be deployed in the future.
keywords: [ docs, documentation, avalanche, teleporter, awm, cross-subnet communication, cross-chain, cross-chain communication ]
sidebar_label: Upgradeability 
sidebar_position: 5
---

${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/build/cross-chain/teleporter/examples.md
      name: "awm-evm-integration",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/meaghanfitzgerald/coreth/docs-integration/precompile/contracts/warp/",
      documents: ["README.md"],
      outDir: "docs/build/cross-chain/awm/",
      // change file name and add metadata correct links
      modifyContent(filename, content) {
        if (filename.includes("README")) {
          const updatedContent = replaceRelativeLinks(
            content,
            "https://github.com/ava-labs/coreth/blob/master/precompile/contracts/warp/"
          );
          return {
            filename: "evm-integration.md",
            content: `---
tags: [Avalanche Warp Messaging, Coreth, Subnet-EVM, Cross-Subnet Communication, Cross-Chain Communication]
description: Avalanche Warp Messaging provides a basic primitive for signing and verifying messages between Subnets. The receiving network can verify whether an aggregation of signatures from a set of source Subnet validators represents a threshold of stake large enough for the receiving network to process the message. The Avalanche Warp Precompile enables this flow to send a message from blockchain A to blockchain B.
keywords: [ coreth, subnet-evm, docs, documentation, avalanche, teleporter, awm, cross-subnet communication, cross-chain, cross-chain communication ]
sidebar_label: EVM Integration 
sidebar_position: 2
---

${updatedContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/learn/acp.md
      name: "acp-overview",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/meaghanfitzgerald/ACPs/main/",
      documents: ["README.md"],
      outDir: "docs/learn/",
      // change file name and add metadata, correct links
      modifyContent(filename, content) {
        if (filename.includes("README")) {
          const updatedContent = replaceRelativeLinks(
            content,
            "https://github.com/avalanche-foundation/ACPs/blob/main/"
          );
          return {
            filename: "acp.md",
            content: `---
tags: [Avalanche Community Proposals, ACPs]
description: An Avalanche Community Proposal is a concise document that introduces a change or best practice for adoption on the Avalanche Network. ACPs should provide clear technical specifications of any proposals and a compelling rationale for their adoption. ACPs are an open framework for proposing improvements and gathering consensus around changes to the Avalanche Network. ACPs can be proposed by anyone. 
keywords: [ avalanche, nodes, preference, avalanche improvements, open source, acps, avalanche community proposals ]
sidebar_label: Avalanche Community Proposals
sidebar_position: 0
---

${updatedContent}`,
          };
        }
        return undefined;
      },
    },
  ],
];

module.exports = remoteContent;
