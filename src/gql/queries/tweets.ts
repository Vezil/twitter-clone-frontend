import { gql } from '@apollo/client';

export const TWEETS_QUERY = gql`
    query TWEETS_QUERY {
        tweets {
            id
            createdAt
            content
            likes {
                id
            }
            comments {
                id
            }
            author {
                id
                name
                profile {
                    id
                    avatar
                }
            }
        }
    }
`;
