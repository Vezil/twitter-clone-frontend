import { gql } from '@apollo/client';

export const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($id: Int!, $content: String!) {
        createComment(id: $id, content: $content) {
            id
        }
    }
`;
