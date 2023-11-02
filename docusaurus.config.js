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
    locales: [
      // "de",
      "en",
      "es",
      // "fa",
      // "fr",
      // "hi",
      // "it",
      // "ja",
      // "ko",
      // "ru",
      // "tu",
      // "vi",
      // "zh-CN",
      // "zh-TW",
    ],
    path: "i18n",
    localeConfigs: {
      en: {
        label: "English",
        direction: "ltr",
        htmlLang: "en-US",
        calendar: "gregory",
        path: "en",
      },
      fr: {
        label: "French",
        direction: "ltr",
        htmlLang: "fr-FR",
        calendar: "gregory",
        path: "fr",
      },
      es: {
        label: "Español",
        direction: "ltr",
        htmlLang: "es-ES",
        calendar: "gregory",
        path: "es",
      },
      ja: {
        label: "Japanese",
        direction: "ltr",
        htmlLang: "ja-JP",
        calendar: "gregory",
        path: "ja",
      },
      ko: {
        label: "Korean",
        direction: "ltr",
        htmlLang: "ko-KR",
        calendar: "gregory",
        path: "ko",
      },
      ru: {
        label: "Russian",
        direction: "ltr",
        htmlLang: "ru-RU",
        calendar: "gregory",
        path: "ru",
      },
      "zh-CN": {
        label: "Chinese (Simplified)",
        direction: "ltr",
        htmlLang: "zh-CN",
        calendar: "gregory",
        path: "zh-CN",
      },
      "zh-TW": {
        label: "Chinese (Traditional)",
        direction: "ltr",
        htmlLang: "zh-TW",
        calendar: "gregory",
        path: "zh-TW",
      },
      vi: {
        label: "Vietnamese",
        direction: "ltr",
        htmlLang: "vi-VI",
        calendar: "gregory",
        path: "vi",
      },
      tu: {
        label: "Turkish",
        direction: "ltr",
        htmlLang: "tu-TU",
        calendar: "gregory",
        path: "tu",
      },
      it: {
        label: "Italian",
        direction: "ltr",
        htmlLang: "it-IT",
        calendar: "gregory",
        path: "it",
      },
      de: {
        label: "German",
        direction: "ltr",
        htmlLang: "de-DE",
        calendar: "gregory",
        path: "de",
      },
      fa: {
        label: "Persian",
        direction: "ltr",
        htmlLang: "fa-FA",
        calendar: "gregory",
        path: "fa",
      },
      hi: {
        label: "Hindi",
        direction: "ltr",
        htmlLang: "hi-HI",
        calendar: "gregory",
        path: "hi",
      },
    },
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

  scripts: [
    // "scripts/intercom-app.js",
    // "scripts/intercom-scripts.js",
    {
      src: "https://widget.kapa.ai/kapa-widget.bundle.js",
      "data-website-id": "84b0d351-622f-46b4-80c9-f1d9850e34b6",
      "data-project-name": "AvaGPT",
      "data-project-color": "#e84142",
      "data-project-logo":
        "data:image/png;base64,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",
      async: true,
    },
  ],

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
        googleTagManager: {
          containerId: "GTM-MHVBTGVC",
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
            type: "localeDropdown",
            position: "right",
          },
          {
            href: "https://chat.avax.network/",
            className: "header-discord-link",
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
