import { useQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';
import FollowUser from '../components/FollowUser';
import LeftNav from '../components/LeftNav';
import PopularTweets from '../components/PopularTweets';
import UnfollowUser from '../components/UnfollowUser';
import { ME_QUERY, USER_QUERY } from '../gql/queries';
import '../styles/primary.css';
import '../styles/profile.css';

export default function SingleUser() {
    const navigate = useNavigate();
    const { id } = useParams() as {
        id: string;
    };
    const { loading, error, data } = useQuery(USER_QUERY, { variables: { id: parseInt(id) } });

    const { loading: meLoading, error: meError, data: meData } = useQuery(ME_QUERY);

    if (loading || meLoading) {
        return <p>Loading...</p>;
    }

    if (error || meError) {
        console.error(error || meError);

        return <p>{error ? error.message : meError?.message}</p>;
    }

    const openProfilePage = () => {
        window.open(`https://${data.user.profile.website}`, '_blank');
    };

    interface FollowersIds {
        followId: number;
        id: number;
    }

    const idOfFollowers = meData.me.followingUsers.map((followingUser: FollowersIds) => followingUser.followId);

    const followers = meData.me.followingUsers.map((followingUser: FollowersIds) => followingUser);

    const followerId = followers.find((follow: any) => follow.followId === data.user.id);

    return (
        <>
            <div className="primary">
                <div className="left">
                    <LeftNav />
                </div>

                <div className="profile">
                    <div className="profile-info">
                        <div className="profile-head">
                            <span className="back-arrow" onClick={() => navigate(-1)}>
                                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                            </span>
                            <span className="nickname">
                                <h3>{data.user.name}</h3>
                            </span>
                        </div>

                        <div className="avatar">
                            {data.user.profile.avatar ? (
                                <img
                                    src={data.user.profile.avatar}
                                    style={{ width: '150px', borderRadius: '50%' }}
                                    alt="avatar"
                                />
                            ) : (
                                <i className="fa fa-user fa-5x" aria-hidden="true"></i>
                            )}
                        </div>
                        <div className="make-profile">
                            {idOfFollowers.includes(data.user.id) ? (
                                <UnfollowUser id={followerId.id} />
                            ) : (
                                <FollowUser id={data.user.id} name={data.user.name} avatar={data.user.profile.avatar} />
                            )}
                        </div>

                        <h3>{data.user.name}</h3>

                        {data.user.profile ? (
                            <p>
                                <i className="fas fa-link"></i>{' '}
                                <span
                                    onClick={openProfilePage}
                                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    {data.user.profile.website}
                                </span>
                            </p>
                        ) : null}

                        <div className="followers">
                            <p>200 following</p>
                            <p>384 following</p>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <PopularTweets />
                </div>
            </div>
        </>
    );
}
