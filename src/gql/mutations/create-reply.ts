import { gql } from '@apollo/client';

export const CREATE_REPLY_MUTATION = gql`
    mutation createReply($id: Int!, $content: String!, $commentId: Int!) {
        createReply(id: $id, content: $content, commentId: $commentId) {
            id
        }
    }
`;
