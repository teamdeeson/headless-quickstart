import { ApolloClient, InMemoryCache } from "@apollo/client";
import { SchemaLink } from "@apollo/client/link/schema";
import casual from "casual";
const { addMocksToSchema } = require("@graphql-tools/mock");
const { makeExecutableSchema } = require("@graphql-tools/schema");

import typeDefs from "../schema.graphql";

const schema = makeExecutableSchema({ typeDefs });
const mocks = {
  String: () => casual.string,
  DrupalRoute: () => ({ __typename: "DrupalNodeRoute" }),
  DrupalRedirectRoute: () => ({ destination: "/test-redirect", status: 307 }),
  Slices: () => ({ __typename: "SomeSliceDataStructure" }),
  BasicPageNode: () => ({ slices: [...new Array(casual.integer(2, 10))] }),
};
const schemaWithMocks = addMocksToSchema({ schema, mocks });

const apolloCache = new InMemoryCache();

const graphqlClient = new ApolloClient({
  cache: apolloCache,
  link: new SchemaLink({ schema: schemaWithMocks }),
});
export default graphqlClient;
