import { gql } from '@apollo/client';

export const SIGNUP_MUTATION = gql`
    mutation signup($name: String, $email: String!, $password: String!) {
        signup(name: $name, email: $email, password: $password) {
            token
        }
    }
`;
