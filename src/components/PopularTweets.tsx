import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { POPULAR_TWEETS } from '../gql/queries';
import '../styles/popularTweets.css';

interface Tweet {
    id: number;
    createdAt: Date;
    content: string;
    author: {
        profile: {
            avatar: string;
        };
    };
    likes: {
        id: number;
        length: number;
    };
}

export default function PopularTweets() {
    const { loading, error, data } = useQuery(POPULAR_TWEETS);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error(error);

        return <p>{error.message}</p>;
    }

    const popularTweets = data.tweets
        .map((tweet: Tweet) => tweet)
        .sort(function (tweetA: Tweet, tweetB: Tweet) {
            return tweetB.likes.length - tweetA.likes.length;
        })
        .slice(0, 6);

    return (
        <div className="popular-tweets">
            <div className="popular-tweets-label">Trending</div>

            <div className="popular-tweets-container">
                {popularTweets.map((tweet: Tweet) => (
                    <div className="popular-tweet-container" key={tweet.id}>
                        <div className="popular-tweet-date">{format(new Date(tweet.createdAt), 'MM/dd/yy')}</div>

                        <Link to={`/tweet/${tweet.id}`} replace>
                            <div className="data-title">
                                <div className="title-logo">
                                    {tweet.author?.profile?.avatar ? (
                                        <img
                                            src={tweet.author.profile.avatar}
                                            style={{ width: '40px', borderRadius: '50%' }}
                                            alt="avatar"
                                        />
                                    ) : (
                                        <i className="fa fa-user fa-2x" aria-hidden="true"></i>
                                    )}
                                    <p className="tweet-content">{tweet.content}</p>
                                </div>
                            </div>

                            <div className="tweet-likes">
                                {tweet.likes.length > 0 ? <span>Likes: {tweet.likes.length}</span> : null}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
