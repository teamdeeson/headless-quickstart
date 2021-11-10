module.exports = {
  client: {
    service: {
      name: "sc",
      localSchemaFile: "./schema.graphql",
    },
    includes: ["src/**/*.+(ts|tsx)"],
  },
};
