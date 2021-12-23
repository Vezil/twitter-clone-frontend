import { gql } from '@apollo/client';

export const TWEET_QUERY = gql`
    query tweet($id: Int) {
        tweet(id: $id) {
            id
            content
            author {
                id
                name
                profile {
                    id
                    avatar
                }
            }
            comments {
                id
                content
                createdAt
                user {
                    id
                    name
                    profile {
                        id
                        avatar
                    }
                }
            }
        }
    }
`;
