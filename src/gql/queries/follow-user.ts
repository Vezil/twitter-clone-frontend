import { gql } from '@apollo/client';

export const FOLLOW_USER_QUERY = gql`
    mutation follow($followId: Int!, $avatar: String!, $name: String!) {
        follow(followId: $followId, avatar: $avatar, name: $name) {
            id
        }
    }
`;
