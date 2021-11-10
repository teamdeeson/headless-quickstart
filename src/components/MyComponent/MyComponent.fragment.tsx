import { gql } from "@apollo/client";

export default gql`
  fragment MyComponentFragment on SomeSliceDataStructure {
    field1
    field2
  }
`;
