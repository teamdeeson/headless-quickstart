import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import casual from "casual";
const { addMocksToSchema } = require("@graphql-tools/mock");
const { makeExecutableSchema } = require("@graphql-tools/schema");

import typeDefs from "../schema.graphql";

const schema = makeExecutableSchema({ typeDefs });
const mocks = {
  String: () => casual.string,
};
const schemaWithMocks = addMocksToSchema({ schema, mocks });

const apolloCache = new InMemoryCache();

const graphqlClient = new ApolloClient({
  cache: apolloCache,
  link: new SchemaLink({ schema: schemaWithMocks }),
});
export default graphqlClient;
