import { gql } from '@apollo/client';

export const LIKE_TWEET_MUTATION = gql`
    mutation likeTweet($id: Int) {
        likeTweet(id: $id) {
            id
        }
    }
`;
