import { gql } from '@apollo/client';

export const ME_QUERY = gql`
    query me {
        me {
            id
            name
            followingUsers {
                id
                followId
                name
                avatar
            }
            likedTweets {
                id
                tweet {
                    id
                    content
                    createdAt
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
            profile {
                id
                bio
                location
                website
                avatar
            }
        }
    }
`;
