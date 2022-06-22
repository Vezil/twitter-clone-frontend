import { useQuery } from '@apollo/client';
import { useState, MouseEvent } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { ME_QUERY } from '../gql/queries';
import { logoutModalStyles } from '../styles/LogoutModal';
import '../styles/logout.css';

export default function Logout() {
    Modal.setAppElement('*');

    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = useState(false);

    const { loading, error, data } = useQuery(ME_QUERY);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error(error);

        return <p>{error.message}</p>;
    }

    const { me } = data;

    const openModal = (event: MouseEvent) => {
        event.stopPropagation();

        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const handleLogout = async () => {
        localStorage.removeItem('token');

        navigate('/login');
    };

    return (
        <div className="logout">
            <div style={{ flex: 1, flexDirection: 'row' }} onClick={() => navigate('/profile')}>
                <h4>
                    {me?.profile?.avatar ? (
                        <img src={me.profile.avatar} style={{ width: '50px', borderRadius: '50%' }} alt="avatar" />
                    ) : (
                        <i className="fa fa-user fa-2x" aria-hidden="true"></i>
                    )}

                    <span style={{ marginLeft: '10px', marginTop: '-10px' }}>{me.name}</span>
                    <div onClick={openModal} className="more-options">
                        <i className="fas fa-ellipsis-h"></i>
                    </div>
                </h4>
            </div>

            <div style={{ position: 'absolute', bottom: 0 }}>
                <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modal" style={logoutModalStyles}>
                    <span onClick={handleLogout} style={{ cursor: 'pointer', textAlign: 'center' }}>
                        <p>
                            <b>Log out</b>
                        </p>
                    </span>
                </Modal>
            </div>
        </div>
    );
}
