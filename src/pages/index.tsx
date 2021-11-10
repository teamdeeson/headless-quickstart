import type { GetServerSideProps, NextPage } from "next";
import { gql } from "@apollo/client";
import MyComponentFragment from "../components/MyComponent/MyComponent.fragment";

import client from "../mockClient";
import { IndexPage } from "./__generated__/IndexPage";
import assertUnreachable from "../assertUnreachable";
import MyComponent from "../components/MyComponent";

const query = gql`
  query IndexPage {
    page {
      title
      slices {
        ...MyComponentFragment
      }
    }
  }
  ${MyComponentFragment}
`;

const Home: NextPage<IndexPage> = ({ page }) => {
  return (
    <>
      <h1>{page.title}</h1>
      {page.slices.map((slice) => {
        switch (slice.__typename) {
          case "SomeSliceDataStructure": {
            return <MyComponent {...slice} />;
          }
          default: {
            assertUnreachable(slice.__typename);
          }
        }
      })}
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const result = await client.query<IndexPage>({ query });
  return {
    props: result.data,
  };
};
