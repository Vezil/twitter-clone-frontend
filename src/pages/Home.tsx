import { useQuery } from '@apollo/client';
import LeftNav from '../components/LeftNav';
import AllTweets from '../components/AllTweets';
import HomePageTweet from '../components/HomePageTweet';
import PopularTweets from '../components/PopularTweets';
import { ME_QUERY } from '../gql/queries';
import '../styles/primary.css';
import '../styles/home.css';

export default function Home() {
    const { loading, error } = useQuery(ME_QUERY);

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
                        <h3 className="home-title">Home</h3>

                        <HomePageTweet />
                    </div>

                    <AllTweets />
                </div>
                <div className="right">
                    <PopularTweets />
                </div>
            </div>
        </>
    );
}
