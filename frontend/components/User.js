import { gql, useQuery } from '@apollo/client';

// keystone has some functionality for this auth
export const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY {
    authenticatedItem {
      ... on User {
        id
        email
        name
        # todo query te user cart
      }
    }
  }
`;

export function useUser() {
  const { data } = useQuery(CURRENT_USER_QUERY);
  // if there is data then return it ( means it is authenticad / logged in)
  return data?.authenticatedItem;
}
