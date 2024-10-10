'use client';
import React, {
  useEffect,
  useState,
  Fragment,
  type ReactElement,
} from 'react';
import { IndentDecrease, Layers, MailIcon, MonitorCheck, Settings, SproutIcon, SquareGanttChart, TerminalIcon, Webhook, HomeIcon, BadgeDollarSign, CpuIcon, Files, Folder, Globe, Link, SquareIcon, ArrowLeftRight, Coins, SquareCode, SquareStackIcon, Triangle } from 'lucide-react';
import { RootToggle } from 'fumadocs-ui/components/layout/root-toggle';

export function DeployBlockchainAnimation(): React.ReactElement {
  const installCmd = 'avalanche blockchain deploy myblockchain';
  const tickTime = 50;
  const timeCommandEnter = installCmd.length;
  const timeCommandRun = timeCommandEnter + 3;
  const timeCommandEnd = timeCommandRun + 3;
  const timeWindowOpen = timeCommandEnd + 1;
  const timeEnd = timeWindowOpen + 1;

  const [tick, setTick] = useState(timeEnd);

  useEffect(() => {
    const timer = setInterval(() => {
      setTick((prev) => (prev >= timeEnd ? prev : prev + 1));
    }, tickTime);

    return () => {
      clearInterval(timer);
    };
  }, [timeEnd]);

  const lines: ReactElement[] = [];

  lines.push(
    <span key="command_type text-xl">
      {installCmd.substring(0, tick)}
      {tick < timeCommandEnter && (
        <div className="inline-block h-3 w-1 animate-pulse bg-white" />
      )}
    </span>,
  );

  if (tick >= timeCommandEnter) {
    lines.push(<span key="space"> </span>);
  }

  if (tick > timeCommandRun)
    lines.push(
      <Fragment key="command_response">
        <span className="font-bold">
          <span className="text-purple-500">?</span> Choose a network for the operation:
        </span>
        {tick > timeCommandRun + 1 && (
          <>
            <span>▸ <u>Local Network</u></span>
            <span>  Devnet</span>
            <span>  Fuji Testnet</span>
            <span>  Mainnet</span>
          </>
        )}
        {tick > timeCommandRun + 2 && (
          <>
            <br/>
            <span>Deploying <i className="font-bold">[myblockchain]</i> to Local Network...</span>
          </>
        )}
        {tick > timeCommandRun + 3 && (
          <>
            <br/>
            <span className="font-bold">Blockchain ready to use</span>
          </>
        )}
      </Fragment>,
    );

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        if (tick >= timeEnd) {
          setTick(0);
        }
      }}
    >
      <pre className="overflow-hidden rounded-xl border text-xs">
        <div className="flex flex-row items-center gap-2 border-b px-4 py-2">
          <TerminalIcon className="size-4" />{' '}
          <span className="font-bold">Avalanche CLI</span>
          <div className="grow" />
          <div className="size-2 rounded-full bg-green-400" />
        </div>
        <div className="min-h-[200px] bg-gradient-to-b from-fd-secondary [mask-image:linear-gradient(to_bottom,white)]">
          <code className="grid p-4">{lines}</code>
        </div>
      </pre>
    </div>
  );
}


export function HamburgerMenu(): React.ReactElement {

  return (
    <RootToggle
    options={[
      {
        title: 'Home',
        description: '',
        icon: <></>,
        url: '/',

      },
      {
        title: 'Avalanche Protocol',
        description: 'Learn about Avalanche',
        icon: <SproutIcon />,
        url: '/learn',
      },
      {
        title: 'Smart Contracts',
        description: 'Build Apps on Avalanche',
        icon: <SquareGanttChart />,
        url: '/dapps',
      },
      {
        title: 'Avalanche L1s',
        description: 'Build Your L1 Blockchain',
        icon: <Layers />,
        url: '/avalanche-l1s',
      },
      {
        title: 'Virtual Machines',
        description: 'Customize Your Execution Layer',
        icon: <IndentDecrease />,
        url: '/virtual-machines',
      },
      {
        title: 'Nodes & Validators',
        description: 'Participate in the Network',
        icon: <MonitorCheck />,
        url: '/nodes',
      },
      {
        title: 'Interoperability',
        description: 'AWM and Teleporter',
        icon: <MailIcon />,
        url: '/cross-chain',
      },
      {
        title: 'Tooling',
        description: 'CLI, Scripts, and More',
        icon: <Settings />,
        url: '/tooling',
      },
      {
        title: 'API Docs',
        description: 'Avalanche API References',
        icon: <Webhook />,
        url: '/api-reference',
      }
    ]}
  />
  )
}

export function AcademyHamburger(): React.ReactElement {

  return (
    <RootToggle
    options={[
      {
        title: 'Academy',
        description: '',
        icon: <></>,
        url: '/',

      },
      {
        title: 'Blockchain Fundamentals',
        description: "Gain a comprehensive understanding of fundamental blockchain concepts, including how they work, and key components",
        icon: <SquareIcon />,
        url: 'https://academy.avax.network/course/blockchain-fundamentals',
      },
      {
        title: 'Avalanche Fundamentals',
        description: "Get a high level overview of Avalanche Consensus, L1s and VMs",
        icon: <Triangle />,
        url: 'https://academy.avax.network/course/avalanche-fundamentals',
      },
      {
        title: "Multi-Chain Architecture",
        description: "Dive deeper into the Multi-Chain Architecture and deploy your own Blockchain",
        icon: <SquareStackIcon />,
        url: 'https://academy.avax.network/course/multi-chain-architecture',
      },
      {
        title:"Interchain Messaging",
        description:"Utilize Avalanche Interchain Messaging to build cross-chain dApps in the Avalanche network",
        icon: <MailIcon />,
        url: 'https://academy.avax.network/course/interchain-messaging',
      },
      {
        title:"Interchain Token Transfer",
        description:"Deploy Avalanche Interchain Token Transfer to transfer assets between Avalanche blockchains",
        icon: <ArrowLeftRight />,
        url: 'https://academy.avax.network/course/interchain-token-transfer',
      },
      {
        title:"Customizing the EVM",
        description:"Learn how to customize the EVM and add your own custom precompiles",
        icon: <SquareCode />,
        url: 'https://academy.avax.network/course/customizing-evm',
      },
      {
        title:"Layer 1 Tokenomics",
        description:"Learn how to design and deploy tokenomics for your Avalanche L1",
        icon: <Coins />,
        url: 'https://academy.avax.network/course/l1-tokenomics',
      },
      {
        title:"AvaCloud APIs",
        description:"Learn how to leverage AvaCloud APIs to build web apps on Avalanche",
        icon: <Webhook />,
        url: 'https://academy.avax.network/course/avacloudapis',
      },
      {
        title:"HyperSDK",
        description:"Learn how to build a high-performance blockchain using HyperSDK",
        icon: <TerminalIcon />,
        url: 'https://academy.avax.network/course/hypersdk',
      }
    ]}
  />
  )
}