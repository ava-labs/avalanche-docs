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
  let lines = content.split("\n");

  if (newLines.length > 0 && lines.length > 0) {
    lines.splice(1, 0, ...newLines);
  }

  return lines.join("\n");
}

let teleporterCourse = [
  `
:::info 
Dive deeper into Teleporter and kickstart your journey in building cross-chain dApps by enrolling in our [<ins>Teleporter course</ins>](https://academy.avax.network/course/teleporter).
:::
`,
];

// Function to insert link to source doc in the content
function insertSourceDocLink(content, sourceDocUrl) {
  const lines = content.split("\n");
  const h1Index = lines.findIndex((line) => line.trim().startsWith("#"));
  if (h1Index !== -1) {
    const tip = [
      "  :::tip",
      `  This page was generated by a plugin that directly references this [file](${sourceDocUrl})`,
      "  in the AvalancheGo GitHub repository.",
      "  :::",
    ];
    lines.splice(h1Index + 1, 0, ...tip); // Insert the admonition block after the h1
  } else {
    console.error(
      "No first-level heading found in the Markdown content. Admonition block not inserted."
    );
  }

  return lines.join("\n");
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
      // /docs/build/cross-chain/awm/relayer.md
      name: "relayer-overview",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/awm-relayer/main/",
      documents: ["README.md"],
      outDir: "docs/build/cross-chain/awm/",
      // change file name and add metadata correct links
      modifyContent(filename, content) {
        if (filename.includes("README")) {
          const updatedContent = replaceRelativeLinks(
            content,
            "https://github.com/ava-labs/awm-relayer/blob/main/"
          );

          const newContent = insertLinesAfterFirstLine(
            updatedContent,
            teleporterCourse
          );

          return {
            filename: "relayer.md",
            content: `---
tags: [Avalanche Warp Messaging, Relayer]
description: Reference relayer implementation for cross-chain Avalanche Warp Message delivery.
keywords: [ docs, documentation, avalanche, teleporter, awm, cross-subnet communication, cross-chain, cross-chain communication ]
sidebar_label: Run a Relayer
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
      // /docs/build/cross-chain/teleporter/overview.md
      name: "teleporter-overview",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/teleporter/main/contracts/teleporter/",
      documents: ["README.md"],
      outDir: "docs/build/cross-chain/teleporter/",
      // change file name and add metadata correct links
      modifyContent(filename, content) {
        if (filename.includes("README")) {
          const updatedContent = replaceRelativeLinks(
            content,
            "https://github.com/ava-labs/teleporter/blob/main/contracts/teleporter/"
          );

          const newContent = insertLinesAfterFirstLine(
            updatedContent,
            teleporterCourse
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
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/build/cross-chain/teleporter/cli.md
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

          const newContent = insertLinesAfterFirstLine(
            updatedContent,
            teleporterCourse
          );

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
      // /docs/build/cross-chain/teleporter/upgradeability.md
      name: "teleporter-upgradeability",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/teleporter/main/contracts/teleporter/registry/",
      documents: ["README.md"],
      outDir: "docs/build/cross-chain/teleporter/",
      // change file name and add metadata correct links
      modifyContent(filename, content) {
        if (filename.includes("README")) {
          const updatedContent = replaceRelativeLinks(
            content,
            "https://github.com/ava-labs/teleporter/blob/main/contracts/teleporter/registry/"
          );

          const newContent = insertLinesAfterFirstLine(
            updatedContent,
            teleporterCourse
          );

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
      // /docs/build/cross-chain/teleporter/evm-integration.md
      name: "awm-evm-integration",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/coreth/master/precompile/contracts/warp/",
      documents: ["README.md"],
      outDir: "docs/build/cross-chain/awm/",
      // change the file name and add metadata correct links
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
      // /docs/reference/p-chain/api.md
      name: "p-api",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/avalanchego/master/vms/platformvm/",
      documents: ["service.md"],
      outDir: "docs/reference/avalanchego/p-chain/",
      // change filename and correct links
      modifyContent(filename, content) {
        if (filename.includes("service")) {
          const newContent = insertSourceDocLink(
            content,
            "https://github.com/ava-labs/avalanchego/tree/master/vms/platformvm/service.md"
          );
          return {
            filename: "api.md",
            content: `${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/reference/x-chain/api.md
      name: "x-api",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/avalanchego/master/vms/avm/",
      documents: ["service.md"],
      outDir: "docs/reference/avalanchego/x-chain/",
      // change filename and correct links
      modifyContent(filename, content) {
        if (filename.includes("service")) {
          const newContent = insertSourceDocLink(
            content,
            "https://github.com/ava-labs/avalanchego/tree/master/vms/avm/service.md"
          );
          return {
            filename: "api.md",
            content: `${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/reference/admin-api.md
      name: "admin-api",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/avalanchego/master/api/admin/",
      documents: ["service.md"],
      outDir: "docs/reference/avalanchego/",
      // change filename and correct links
      modifyContent(filename, content) {
        if (filename.includes("service")) {
          const newContent = insertSourceDocLink(
            content,
            "https://github.com/ava-labs/avalanchego/tree/master/api/admin/service.md"
          );
          return {
            filename: "admin-api.md",
            content: `${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/reference/health-api.md
      name: "health-api",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/avalanchego/master/api/health/",
      documents: ["service.md"],
      outDir: "docs/reference/avalanchego/",
      // change filename and correct links
      modifyContent(filename, content) {
        if (filename.includes("service")) {
          const newContent = insertSourceDocLink(
            content,
            "https://github.com/ava-labs/avalanchego/tree/master/api/health/service.md"
          );
          return {
            filename: "health-api.md",
            content: `${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/reference/info-api.md
      name: "info-api",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/avalanchego/master/api/info/",
      documents: ["service.md"],
      outDir: "docs/reference/avalanchego/",
      // change filename and correct links
      modifyContent(filename, content) {
        if (filename.includes("service")) {
          const newContent = insertSourceDocLink(
            content,
            "https://github.com/ava-labs/avalanchego/tree/master/api/info/service.md"
          );
          return {
            filename: "info-api.md",
            content: `${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/reference/metrics-api.md
      name: "metrics-api",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/avalanchego/master/api/metrics/",
      documents: ["service.md"],
      outDir: "docs/reference/avalanchego/",
      // change filename and correct links
      modifyContent(filename, content) {
        if (filename.includes("service")) {
          const newContent = insertSourceDocLink(
            content,
            "https://github.com/ava-labs/avalanchego/tree/master/api/metrics/service.md"
          );
          return {
            filename: "metrics-api.md",
            content: `${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/reference/keystore-api.md
      name: "keystore-api",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/avalanchego/master/api/keystore/",
      documents: ["service.md"],
      outDir: "docs/reference/avalanchego/",
      // change filename and correct links
      modifyContent(filename, content) {
        if (filename.includes("service")) {
          const newContent = insertSourceDocLink(
            content,
            "https://github.com/ava-labs/avalanchego/tree/master/api/keystore/service.md"
          );
          return {
            filename: "keystore-api.md",
            content: `${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/reference/index-api.md
      name: "index-api",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/avalanchego/master/indexer/",
      documents: ["service.md"],
      outDir: "docs/reference/avalanchego/",
      // change filename and correct links
      modifyContent(filename, content) {
        if (filename.includes("service")) {
          const newContent = insertSourceDocLink(
            content,
            "https://github.com/ava-labs/avalanchego/tree/master/indexer/service.md"
          );
          return {
            filename: "index-api.md",
            content: `${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/nodes/configure/avalanchego-config-flags.md
      name: "avalanchego-config-flags",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/avalanchego/master/config/",
      documents: ["config.md"],
      outDir: "docs/nodes/configure/",
      // change filename and correct links
      modifyContent(filename, content) {
        if (filename.includes("config")) {
          const newContent = insertSourceDocLink(
            content,
            "https://github.com/ava-labs/avalanchego/tree/master/config/config.md"
          );
          return {
            filename: "avalanchego-config-flags.md",
            content: `${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/nodes/configure/subnet-configs.md
      name: "subnet-configs",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/avalanchego/master/subnets/",
      documents: ["config.md"],
      outDir: "docs/nodes/configure/",
      // change filename and correct links
      modifyContent(filename, content) {
        if (filename.includes("config")) {
          const newContent = insertSourceDocLink(
            content,
            "https://github.com/ava-labs/avalanchego/tree/master/subnets/config.md"
          );
          return {
            filename: "subnet-configs.md",
            content: `${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/nodes/configure/chain-configs/P.md
      name: "P-configs",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/avalanchego/master/vms/platformvm/config/",
      documents: ["config.md"],
      outDir: "docs/nodes/configure/chain-configs/",
      // change filename and correct links
      modifyContent(filename, content) {
        if (filename.includes("config")) {
          const newContent = insertSourceDocLink(
            content,
            "https://github.com/ava-labs/avalanchego/tree/master/vms/platformvm/config/config.md"
          );
          return {
            filename: "P.md",
            content: `${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
  [
    "docusaurus-plugin-remote-content",
    {
      // /docs/nodes/configure/chain-configs/X.md
      name: "X-configs",
      sourceBaseUrl:
        "https://raw.githubusercontent.com/ava-labs/avalanchego/master/vms/avm/",
      documents: ["config.md"],
      outDir: "docs/nodes/configure/chain-configs/",
      // change filename and correct links
      modifyContent(filename, content) {
        if (filename.includes("config")) {
          const newContent = insertSourceDocLink(
            content,
            "https://github.com/ava-labs/avalanchego/tree/master/vms/avm/config.md"
          );
          return {
            filename: "X.md",
            content: `${newContent}`,
          };
        }
        return undefined;
      },
    },
  ],
];

module.exports = remoteContent;
