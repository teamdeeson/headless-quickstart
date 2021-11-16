import type { GetServerSideProps, NextPage } from "next";
import { gql } from "@apollo/client";
import MyComponentFragment from "../components/MyComponent/MyComponent.fragment";

import mockClient from "../mockClient";
import { IndexPage } from "./__generated__/IndexPage";
import assertUnreachable from "../assertUnreachable";
import MyComponent from "../components/MyComponent";

const query = gql`
  query IndexPage {
    route(path: "/") {
      ... on DrupalRedirectRoute {
        destination
        status
      }
      ... on DrupalNodeRoute {
        node {
          title
          ... on BasicPageNode {
            slices {
              ...MyComponentFragment
            }
          }
        }
      }
    }
  }
  ${MyComponentFragment}
`;

const Home: NextPage<IndexPage> = ({ route }) => {
  if (route.__typename !== "DrupalNodeRoute") {
    throw new Error("unexpected page type: " + route.__typename);
  }
  const node = route.node;
  return (
    <>
      <h1>{node.title}</h1>
      {node.slices?.map((slice) => {
        switch (slice.__typename) {
          case "SomeSliceDataStructure": {
            return <MyComponent {...slice} />;
          }
          case "TextParagraph": {
            return <></>;
          }
          case "TextWithImageParagraph": {
            return <></>;
          }
          default: {
            assertUnreachable(slice);
          }
        }
      })}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = await mockClient.query<IndexPage>({ query });
  if (result.data.route.__typename === "DrupalRedirectRoute") {
    return {
      props: {},
      redirect: {
        destination: result.data.route.destination,
        statusCode: result.data.route.status,
      },
    };
  }

  return {
    props: result.data,
  };
};
