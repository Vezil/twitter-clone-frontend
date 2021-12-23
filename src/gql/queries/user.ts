import { gql } from '@apollo/client';

export const USER_QUERY = gql`
    query user($id: Int) {
        user(id: $id) {
            id
            name
            profile {
                id
                avatar
                website
            }
        }
    }
`;
