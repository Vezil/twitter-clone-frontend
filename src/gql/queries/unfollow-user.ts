import { gql } from '@apollo/client';

export const UNFOLLOW_USER_QUERY = gql`
    mutation deleteFollow($id: Int!) {
        deleteFollow(id: $id) {
            id
        }
    }
`;
