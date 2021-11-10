export type ComponentProps<GraphQLFragment extends { __typename: string }, Extras = {}> = Omit<
  GraphQLFragment,
  "__typename"
> &
  Extras;
