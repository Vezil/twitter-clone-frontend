import { gql } from '@apollo/client';

export const UPDATE_PROFILE_MUTATION = gql`
    mutation updateProfile($id: Int!, $bio: String, $location: String, $website: String, $avatar: String) {
        updateProfile(id: $id, bio: $bio, location: $location, website: $website, avatar: $avatar) {
            id
        }
    }
`;
