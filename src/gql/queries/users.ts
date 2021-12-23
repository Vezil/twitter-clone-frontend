import { gql } from '@apollo/client';

export const USERS_QUERY = gql`
    query USERS_QUERY {
        users {
            id
            name
        }
    }
`;
