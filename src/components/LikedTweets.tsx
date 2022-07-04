import { formatDistance, subDays } from 'date-fns';
import { Link } from 'react-router-dom';
import '../styles/likedTweets.css';

interface AllTweets {
    id: number;
    content: string;
    createdAt: Date;
    likes: [];
    comments: [];
    tweet: any;
    author: {
        id: number;
        name: string;
        profile: {
            avatar: string;
        };
    };
}

export default function LikedTweets({ tweetsData }: any) {
    return (
        <div className="liked-tweets-container">
            <div className="liked-tweets-label">Liked Tweets</div>

            {tweetsData.likedTweets.map((tweetData: AllTweets) => (
                <div className="liked-tweet-container" key={tweetData.id}>
                    <div className="tweet-header">
                        {tweetData.tweet.author?.profile?.avatar ? (
                            <img
                                src={tweetData.tweet.author.profile.avatar}
                                style={{ width: '40px', borderRadius: '50%' }}
                                alt="avatar"
                            />
                        ) : (
                            <i className="fa fa-user fa-2x" aria-hidden="true"></i>
                        )}
                        <Link to={`/user/${tweetData.tweet.author?.id}`} replace>
                            <h4 className="name">{tweetData.tweet.author?.name}</h4>
                        </Link>

                        <p className="date-time">
                            {formatDistance(subDays(new Date(tweetData.tweet.createdAt), 0), new Date())}
                        </p>
                    </div>
                    <Link to={`tweet/${tweetData.tweet.id}`} replace>
                        <p>{tweetData.tweet.content}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}
