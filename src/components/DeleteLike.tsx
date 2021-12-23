import { useMutation } from '@apollo/client';
import { ME_QUERY, TWEETS_QUERY } from '../gql/queries';
import { DELETE_LIKE_MUTATION } from '../gql/mutations';

interface Props {
    id: number;
}

export default function DeleteLike({ id }: Props) {
    const refetchQueries = [{ query: TWEETS_QUERY }, { query: ME_QUERY }];

    const [deleteLike] = useMutation(DELETE_LIKE_MUTATION, { refetchQueries });

    const handleDelteteLike = async () => {
        await deleteLike({
            variables: { id }
        });
    };

    return (
        <span onClick={handleDelteteLike} style={{ marginRight: '5px', cursor: 'pointer' }}>
            <i className="fas fa-thumbs-up" aria-hidden="true" />
        </span>
    );
}
