import { gql } from '@apollo/client';

export const CREATE_PROFILE_MUTATION = gql`
    mutation createProfile($bio: String, $location: String, $website: String, $avatar: String) {
        createProfile(bio: $bio, location: $location, website: $website, avatar: $avatar) {
            id
        }
    }
`;
