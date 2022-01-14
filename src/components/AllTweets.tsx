import { useQuery } from '@apollo/client';
import { formatDistance } from 'date-fns';
import { subDays } from 'date-fns/esm';
import { Link } from 'react-router-dom';
import { ME_QUERY, TWEETS_QUERY } from '../gql/queries';
import CreateComment from './CreateComment';
import DeleteLike from './DeleteLike';
import LikeTweet from './LikeTweet';
import '../styles/allTweets.css';

export default function AllTweets() {
    const { loading, error, data } = useQuery(TWEETS_QUERY);
    const { loading: meLoading, error: meError, data: meData } = useQuery(ME_QUERY);

    if (loading || meLoading) {
        return <p>Loading...</p>;
    }

    if (error || meError) {
        console.error(error || meError);

        return <p>{error ? error.message : meError?.message}</p>;
    }

    interface Tweet {
        id: number;
        content: string;
        createdAt: Date;
        likes: [];
        comments: [];
        author: {
            id: number;
            name: string;
            profile: {
                avatar: string;
            };
        };
    }

    interface LikedTweet {
        id: number;
        tweet: {
            id: number;
        };
    }

    return (
        <div>
            {data.tweets.map((tweet: Tweet, index: number) => (
                <div className="tweet-container" key={index}>
                    <Link to={`/user/${tweet.author.id}`} replace>
                        <div className="tweet-header">
                            {tweet.author?.profile?.avatar ? (
                                <img
                                    src={tweet.author.profile.avatar}
                                    style={{ width: '40px', borderRadius: '50px' }}
                                    alt="avatar"
                                />
                            ) : (
                                <i className="fa fa-user fa-2x" aria-hidden="true"></i>
                            )}

                            <div className="name-container">
                                <h4 className="name">{tweet.author.name}</h4>
                            </div>

                            <p className="date-time">
                                {formatDistance(subDays(new Date(tweet.createdAt), 0), new Date())} ago
                            </p>
                        </div>
                    </Link>

                    <Link to={`/tweet/${tweet.id}`} replace>
                        <p>{tweet.content}</p>
                    </Link>

                    <div className="likes">
                        {meData.me.likedTweets &&
                        meData.me.likedTweets.length &&
                        meData.me.likedTweets
                            .map((likedTweet: LikedTweet) => likedTweet.tweet.id)
                            .includes(tweet.id) ? (
                            <span>
                                <DeleteLike
                                    id={meData.me.likedTweets.find((like: LikedTweet) => like.tweet.id === tweet.id).id}
                                />

                                {tweet.likes?.length || 0}
                            </span>
                        ) : (
                            <span>
                                <LikeTweet id={tweet.id} />

                                {tweet.likes?.length || 0}
                            </span>
                        )}

                        <span style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                            <CreateComment
                                avatar={tweet.author?.profile?.avatar}
                                name={tweet.author.name}
                                tweetContent={tweet.content}
                                id={tweet.id}
                            />
                            {tweet.comments?.length || null}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}
