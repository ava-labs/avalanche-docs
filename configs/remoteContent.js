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
          return {
            filename: "overview.md",
            content: `---
tags: [Teleporter, Cross-Subnet Communication, Cross-Chain Communication]
description: Teleporter is a messaging protocol built on top of Avalanche Warp Messaging that provides a developer-friendly interface for sending and receiving cross-chain messages from within the EVM.
keywords: [ docs, documentation, avalanche, teleporter, awm, cross-subnet communication, cross-chain, cross-chain communication ]
sidebar_label: Overview
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

${updatedContent}`,
          };
        }
        return undefined;
      },
    },
  ],
];

module.exports = remoteContent;
