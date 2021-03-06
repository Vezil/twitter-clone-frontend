import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import LeftNav from '../components/LeftNav';
import PopularTweets from '../components/PopularTweets';
import CreateReply from '../components/CreateReply';
import { TWEET_QUERY } from '../gql/queries';
import '../styles/primary.css';
import '../styles/home.css';
import '../styles/singleTweet.css';

interface CommentType {
    id: number;
    content: string;
    createdAt: Date;
    user: {
        id: number;
        name: string;
        profile: {
            id: number;
            avatar: string;
        };
    };
}

export default function SingleTweet() {
    const navigate = useNavigate();
    const { id } = useParams() as {
        id: string;
    };

    const { loading, error, data } = useQuery(TWEET_QUERY, {
        variables: { id: parseInt(id) }
    });

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error(error);

        return <p>{error.message}</p>;
    }

    return (
        <>
            <div className="primary">
                <div className="left">
                    <LeftNav />
                </div>
                <div className="home">
                    <div className="home-header">
                        <span className="back-arrow" onClick={() => navigate('/')}>
                            <i className="fa fa-arrow-left" aria-hidden="true"></i>
                        </span>

                        <h3 className="home-title">Tweet</h3>
                    </div>

                    <div className="single-tweet">
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: '1fr 1fr 8fr',
                                marginTop: '10px',
                                padding: '10px'
                            }}
                        >
                            {data.tweet.author?.profile?.avatar ? (
                                <img
                                    src={data.tweet.author.profile.avatar}
                                    style={{ width: '40px', borderRadius: '50%' }}
                                    alt="avatar"
                                />
                            ) : (
                                <i className="fa fa-user fa-2x" aria-hidden="true"></i>
                            )}
                            <h5>{data.tweet.author?.profile?.name}</h5>
                        </div>

                        <div
                            style={{
                                marginLeft: '20px',
                                borderLeft: '1px solid var(--accent)',
                                paddingLeft: '20px',
                                marginTop: 0
                            }}
                        >
                            {data.tweet.content}
                        </div>
                    </div>

                    <hr />

                    <div className="single-tweet-comments">
                        {data.tweet.comments.map((comment: CommentType) => (
                            <div key={comment.id}>
                                <>
                                    <div
                                        style={{
                                            display: 'grid',
                                            gridTemplateColumns: '1fr 1fr 8fr',
                                            marginTop: '10px',
                                            marginLeft: '10px'
                                        }}
                                    >
                                        {comment.user.profile.avatar ? (
                                            <img
                                                src={comment.user.profile.avatar}
                                                style={{ width: '40px', borderRadius: '50%' }}
                                                alt="avatar"
                                            />
                                        ) : (
                                            <i className="fa fa-user fa-2x" aria-hidden="true"></i>
                                        )}
                                        <h5>{comment.user.name}</h5>
                                    </div>
                                    <p>{comment.content}</p>

                                    <CreateReply
                                        name={comment.user.name}
                                        avatar={comment.user.profile.avatar}
                                        id={data.tweet.id}
                                        commentContent={comment.content}
                                        commentId={comment.id}
                                    />
                                </>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="right">
                    <PopularTweets />
                </div>
            </div>
        </>
    );
}
