import { useMutation } from '@apollo/client';
import { ME_QUERY, UNFOLLOW_USER_QUERY } from '../gql/queries';

interface Props {
    id: string;
}

export default function UnfollowUser({ id }: Props) {
    const [deleteFollow] = useMutation(UNFOLLOW_USER_QUERY, { refetchQueries: [{ query: ME_QUERY }] });

    const handleUnfollow = async () => {
        await deleteFollow({ variables: { id: parseInt(id) } });
    };

    return (
        <div>
            <button onClick={handleUnfollow} className="twitter-button">
                Unfollow
            </button>
        </div>
    );
}
