import { gql } from '@apollo/client';

export const DELETE_LIKE_MUTATION = gql`
    mutation deleteLike($id: Int!) {
        deleteLike(id: $id) {
            id
        }
    }
`;
