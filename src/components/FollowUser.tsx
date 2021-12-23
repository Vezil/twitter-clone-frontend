import { useMutation } from '@apollo/client';
import { ME_QUERY, FOLLOW_USER_QUERY } from '../gql/queries';

interface Props {
    id: number;
    name: string;
    avatar: string;
}

export default function FollowUser({ id, name, avatar }: Props) {
    const [follow] = useMutation(FOLLOW_USER_QUERY, { refetchQueries: [{ query: ME_QUERY }] });

    const handleFollow = async () => {
        await follow({ variables: { followId: id, name, avatar } });
    };

    return (
        <div>
            <button onClick={handleFollow} className="twitter-button">
                Follow
            </button>
        </div>
    );
}
