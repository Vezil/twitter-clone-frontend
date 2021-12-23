import { useMutation } from '@apollo/client';
import { ME_QUERY, TWEETS_QUERY } from '../gql/queries';
import { LIKE_TWEET_MUTATION } from '../gql/mutations';

interface Props {
    id: number;
}

export default function LikeTweet({ id }: Props) {
    const refetchQueries = [{ query: TWEETS_QUERY }, { query: ME_QUERY }];

    const [likeTweet] = useMutation(LIKE_TWEET_MUTATION, { refetchQueries });

    const handleCreateLike = async () => {
        await likeTweet({
            variables: { id }
        });
    };

    return (
        <span onClick={handleCreateLike} style={{ marginRight: '5px', cursor: 'pointer' }}>
            <i className="far fa-thumbs-up" aria-hidden="true" />
        </span>
    );
}
