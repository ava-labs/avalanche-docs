// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
const config = {
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  title: "Avalanche Dev Docs",
  tagline: "Create Without Limits",
  url: "https://docs.avax.network",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  organizationName: "ava-labs",
  projectName: "avalanche-docs",
  trailingSlash: false,

  scripts: ["scripts/intercom-app.js", "scripts/intercom-scripts.js"],

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          editUrl: "https://github.com/ava-labs/avalanche-docs/edit/master/",
          sidebarPath: "./sidebars.json",
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "G-HGX2HKR5GK",
          anonymizeIP: true,
        },
      }),
    ],
  ],

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
      crossorigin: "anonymous",
    },
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: "img/Avalanche-OG-Image.png?force-reload-1",
      metadata: [
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:description",
          content:
            "The fastest, most reliable smart contracts platform in the world. Build anything you want, any way you want, on the eco-friendly blockchain designed for Web3 devs.",
        },
        {
          name: "twitter:title",
          content: "Avalanche Dev Docs: Create Without Limits",
        },
        {
          name: "keywords",
          content: "Avalanche Dev Docs: Create Without Limits",
        },
      ],
      navbar: {
        title: "",
        logo: {
          alt: "Avalanche Logo",
          src: "img/Avalanche_Horizontal_Red.svg",
        },
        items: [
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "learn",
            label: "Learn",
          },
          {
            type: "dropdown",
            position: "left",
            label: "Build",
            items: [
              {
                type: "docSidebar",
                label: "Dapps",
                sidebarId: "build-dapp",
              },
              {
                type: "docSidebar",
                label: "Subnets",
                sidebarId: "build-subnet",
              },
              {
                type: "docSidebar",
                label: "Virtual Machines",
                sidebarId: "build-vm",
              },
            ],
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "nodes",
            label: "Nodes",
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "tooling",
            label: "Tooling",
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "reference",
            label: "Reference",
          },
          {
            type: "docSidebar",
            position: "left",
            sidebarId: "community",
            label: "Community",
          },
          {
            type: "localeDropdown",
            position: "right",
          },
          {
            href: "https://chat.avax.network/",
            className: "header-discord-link",
            position: "right",
          },
          {
            href: "https://twitter.com/AvaxDevelopers",
            className: "header-twitter-link",
            position: "right",
          },
          {
            href: "https://github.com/ava-labs",
            className: "header-github-link",
            position: "right",
          },
        ],
      },
      footer: {
        links: [],
        copyright: `Copyright © ${new Date().getFullYear()} Ava Labs, Inc.`,
        logo: {
          src: "/img/Avalanche_Horizontal_Red.svg",
        },
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["rust"],
      },
      algolia: {
        appId: "UAFD8IBIF7",
        apiKey: "20006f8de4bf55970ebca9129c345a1d",
        indexName: "avax",
        contextualSearch: true,
      },
    }),
};

module.exports = config;
