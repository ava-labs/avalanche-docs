const apiContent = [
  [
    "docusaurus-plugin-openapi-docs",
    {
      id: "glacier",
      docsPluginId: "classic",
      config: {
        glacier: {
          specPath: "https://glacier-api.avax.network/api-json", // path to OpenAPI spec, URLs supported
          outputDir: "docs/tooling/glacier-api",
          sidebarOptions: {
            groupPathsBy: "tag",
            categoryLinkSource: "tag",
          },
        },
      },
    },
  ],
];

module.exports = apiContent;
