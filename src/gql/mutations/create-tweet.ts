import { gql } from '@apollo/client';

export const CREATE_TWEET_MUTATION = gql`
    mutation createTweet($content: String!) {
        createTweet(content: $content) {
            id
        }
    }
`;
