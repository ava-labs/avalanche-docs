import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';

interface FileConfig {
  sourceUrl: string;
  outputPath: string;
  title: string;
  description: string;
  contentUrl: string;
}

async function fetchFileContent(url: string): Promise<string | null> {
  try {
    const response = await axios.get<string>(url);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch ${url}:`, error);
    return null;
  }
}

function replaceRelativeLinks(content: string, sourceBaseUrl: string): string {
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

function transformContent(content: string, customTitle: string, customDescription: string, sourceBaseUrl: string): string {
  content = content.replace(/^#\s+.+\n/, '');
  const title = customTitle || 'Untitled';
  const description = customDescription || '';

  const frontmatter = `---
title: ${title}
description: ${description}
---

`;

  content = content.replace(/^(#{2,6})\s/gm, (match) => '#'.repeat(match.length - 1) + ' ');
  content = replaceRelativeLinks(content, sourceBaseUrl);

  return frontmatter + content;
}

async function processFile(fileConfig: FileConfig): Promise<void> {
  const content = await fetchFileContent(fileConfig.sourceUrl);
  if (content) {
    const contentBaseUrl = new URL('.', fileConfig.contentUrl).href;
    const transformedContent = transformContent(content, fileConfig.title, fileConfig.description, contentBaseUrl);
    const outputDir = path.dirname(fileConfig.outputPath);
    fs.mkdirSync(outputDir, { recursive: true });

    fs.writeFileSync(fileConfig.outputPath, transformedContent);
    console.log(`Processed and saved: ${fileConfig.outputPath}`);
  }
}

async function main(): Promise<void> {
  const fileConfigs: FileConfig[] = [
    { 
      sourceUrl: "https://raw.githubusercontent.com/ava-labs/avalanchego/master/vms/platformvm/warp/README.md",
      outputPath: "content/docs/cross-chain/avalanche-warp-messaging/deep-dive.mdx",
      title: "Deep Dive into ICM",
      description: "Learn about Avalanche Warp Messaging, a cross-Avalanche L1 communication protocol on Avalanche.",
      contentUrl: "https://github.com/ava-labs/avalanchego/tree/master/vms/platformvm/warp/",
    },
    { 
      sourceUrl: "https://raw.githubusercontent.com/ava-labs/icm-services/refs/heads/main/README.md",
      outputPath: "content/docs/cross-chain/avalanche-warp-messaging/run-relayer.mdx",
      title: "Run a Relayer",
      description: "Reference relayer implementation for cross-chain Avalanche Interchain Message delivery.",
      contentUrl: "https://github.com/ava-labs/icm-services/blob/main/",
    },
    { 
      sourceUrl: "https://raw.githubusercontent.com/ava-labs/icm-contracts/refs/heads/main/contracts/teleporter/README.md",
      outputPath: "content/docs/cross-chain/teleporter/overview.mdx",
      title: "What is ICM Contracts?",
      description: "ICM Contracts is a messaging protocol built on top of Avalanche Interchain Messaging that provides a developer-friendly interface for sending and receiving cross-chain messages from the EVM.",
      contentUrl: "https://github.com/ava-labs/icm-contracts/blob/main/contracts/teleporter/",
    },
    { 
      sourceUrl: "https://raw.githubusercontent.com/ava-labs/icm-contracts/main/README.md",
      outputPath: "content/docs/cross-chain/teleporter/deep-dive.mdx",
      title: "Deep Dive into ICM Contracts",
      description: "ICM Contracts is an EVM compatible cross-Avalanche L1 communication protocol built on top of Avalanche Interchain Messaging (ICM), and implemented as a Solidity smart contract.",
      contentUrl: "https://github.com/ava-labs/teleporter/blob/main/",
    },
    { 
      sourceUrl: "https://raw.githubusercontent.com/ava-labs/teleporter/main/cmd/teleporter-cli/README.md",
      outputPath: "content/docs/cross-chain/teleporter/cli.mdx",
      title: "Teleporter CLI",
      description: "The CLI is a command line interface for interacting with the Teleporter contracts.",
      contentUrl: "https://github.com/ava-labs/teleporter/blob/main/cmd/teleporter-cli/README.md",
    },
    { 
      sourceUrl: "https://raw.githubusercontent.com/ava-labs/teleporter/main/contracts/teleporter/registry/README.md",
      outputPath: "content/docs/cross-chain/teleporter/upgradeability.mdx",
      title: "Upgradeability",
      description: "The TeleporterMessenger contract is non-upgradable. However, there could still be new versions of TeleporterMessenger contracts needed to be deployed in the future.",
      contentUrl: "https://github.com/ava-labs/teleporter/blob/main/contracts/teleporter/registry/",
    },
    { 
      sourceUrl: "https://raw.githubusercontent.com/ava-labs/coreth/master/precompile/contracts/warp/README.md",
      outputPath: "content/docs/cross-chain/avalanche-warp-messaging/evm-integration.mdx",
      title: "Integration with EVM",
      description: "Avalanche Warp Messaging provides a basic primitive for signing and verifying messages between Avalanche L1s.",
      contentUrl: "https://github.com/ava-labs/coreth/blob/master/precompile/contracts/warp/",
    },
    { 
      sourceUrl: "https://raw.githubusercontent.com/ava-labs/avalanchego/master/api/admin/service.md",
      outputPath: "content/docs/api-reference/admin-api.mdx",
      title: "Admin API",
      description: "This page is an overview of the Admin API associated with AvalancheGo.",
      contentUrl: "https://github.com/ava-labs/avalanchego/blob/master/api/admin/",
    },
    { 
      sourceUrl: "https://raw.githubusercontent.com/ava-labs/avalanchego/master/api/health/service.md",
      outputPath: "content/docs/api-reference/health-api.mdx",
      title: "Health API",
      description: "This page is an overview of the Health API associated with AvalancheGo.",
      contentUrl: "https://github.com/ava-labs/avalanchego/blob/master/api/health/",
    },
    { 
      sourceUrl: "https://raw.githubusercontent.com/ava-labs/avalanchego/master/api/info/service.md",
      outputPath: "content/docs/api-reference/info-api.mdx",
      title: "Info API",
      description: "This page is an overview of the Info API associated with AvalancheGo.",
      contentUrl: "https://github.com/ava-labs/avalanchego/blob/master/api/info/",
    },
    { 
      sourceUrl: "https://raw.githubusercontent.com/ava-labs/avalanchego/master/api/keystore/service.md",
      outputPath: "content/docs/api-reference/keystore-api.mdx",
      title: "Keystore API",
      description: "This page is an overview of the Keystore API associated with AvalancheGo.",
      contentUrl: "https://github.com/ava-labs/avalanchego/blob/master/api/keystore/",
    },
    { 
      sourceUrl: "https://raw.githubusercontent.com/ava-labs/avalanchego/master/api/metrics/service.md",
      outputPath: "content/docs/api-reference/metrics-api.mdx",
      title: "Metrics API",
      description: "This page is an overview of the Metrics API associated with AvalancheGo.",
      contentUrl: "https://github.com/ava-labs/avalanchego/blob/master/api/metrics/",
    },
    { 
      sourceUrl: "https://raw.githubusercontent.com/ava-labs/avalanchego/master/indexer/service.md",
      outputPath: "content/docs/api-reference/index-api.mdx",
      title: "Index API",
      description: "This page is an overview of the Index API associated with AvalancheGo.",
      contentUrl: "https://github.com/ava-labs/avalanchego/blob/master/indexer/",
    },
    { 
      sourceUrl: "https://raw.githubusercontent.com/ava-labs/avalanchego/master/vms/platformvm/service.md",
      outputPath: "content/docs/api-reference/p-chain/api.mdx",
      title: "API",
      description: "This page is an overview of the P-Chain API associated with AvalancheGo.",
      contentUrl: "https://github.com/ava-labs/avalanchego/blob/master/vms/platformvm/",
    },
  ];

  for (const fileConfig of fileConfigs) {
    await processFile(fileConfig);
  }
}

main().catch(console.error);