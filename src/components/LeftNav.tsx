import { Link } from 'react-router-dom';
import Logout from './Logout';
import Tweet from './Tweet';
import icon from '../styles/assets/twitter-logo.png';
import '../styles/left-nav.css';

export default function LeftNav() {
    return (
        <div>
            <Link to="/" replace>
                <img src={icon} alt="logo" style={{ width: '40px' }} />
            </Link>

            <Link to="/" replace>
                <h2>
                    <i className="fa fa-home" aria-hidden="true"></i>
                    <span className="title">Home</span>
                </h2>
            </Link>

            <Link to="/profile" replace>
                <h2>
                    <i className="fa fa-user" aria-hidden="true"></i>
                    <span className="title">Profile</span>
                </h2>
            </Link>

            <Link to="/#" replace>
                <h2>
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                    <span className="title">Messages</span>
                </h2>
            </Link>

            <Link to="/#" replace>
                <h2>
                    <i className="fa fa-bell" aria-hidden="true"></i>
                    <span className="title">Notifications</span>
                </h2>
            </Link>

            <Link to="/#" replace>
                <h2>
                    <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                    <span className="title">More</span>
                </h2>
            </Link>

            <Tweet />

            <Logout />
        </div>
    );
}
