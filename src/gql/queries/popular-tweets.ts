import { gql } from '@apollo/client';

export const POPULAR_TWEETS = gql`
    query POPULAR_TWEETS {
        tweets {
            id
            createdAt
            content
            author {
                id
                profile {
                    id
                    avatar
                }
            }
            likes {
                id
            }
        }
    }
`;
