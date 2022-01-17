import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import CreateProfile from '../components/CreateProfile';
import Following from '../components/Following';
import LeftNav from '../components/LeftNav';
import LikedTweets from '../components/LikedTweets';
import PopularTweets from '../components/PopularTweets';
import UpdateProfile from '../components/UpdateProfile';
import { ME_QUERY } from '../gql/queries';
import '../styles/primary.css';
import '../styles/profile.css';

export default function Profile() {
    const { loading, error, data } = useQuery(ME_QUERY);
    const navigate = useNavigate();

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error(error);

        return <p>{error.message}</p>;
    }

    const openProfilePage = () => {
        window.open(`https://${data.me?.profile.website}`, '_blank');
    };

    return (
        <>
            <div className="primary">
                <div className="left">
                    <LeftNav />
                </div>

                <div className="profile">
                    <div className="profile-info">
                        <div className="profile-head">
                            <span className="back-arrow" onClick={() => navigate('/')}>
                                <i className="fa fa-arrow-left" aria-hidden="true"></i>
                            </span>
                            <span className="nickname">
                                <h3>{data.me.name}</h3>
                            </span>
                        </div>

                        <div className="avatar">
                            {data.me?.profile?.avatar ? (
                                <img
                                    src={data.me?.profile?.avatar}
                                    style={{ width: '150px', borderRadius: '50%' }}
                                    alt="avatar"
                                />
                            ) : (
                                <i className="fa fa-user fa-5x" aria-hidden="true"></i>
                            )}
                        </div>
                        <div className="make-profile">
                            {data.me.profile?.id ? <UpdateProfile /> : <CreateProfile />}
                        </div>

                        <h3>{data.me.name}</h3>

                        {data.me?.profile ? (
                            <p>
                                <i className="fas fa-link"></i>{' '}
                                <span
                                    onClick={openProfilePage}
                                    style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                >
                                    {data.me?.profile.website}
                                </span>
                            </p>
                        ) : null}

                        <div className="followers">
                            <Following />

                            <p>70 followers</p>
                        </div>
                    </div>
                </div>

                <LikedTweets tweetsData={data.me} />

                <div className="right">
                    <PopularTweets />
                </div>
            </div>
        </>
    );
}
