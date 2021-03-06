import { useQuery } from '@apollo/client';
import { useState } from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import { ME_QUERY } from '../gql/queries';
import { customStyles } from '../styles/CustomModalStyles';
import '../styles/tweet.css';

export default function Following() {
    Modal.setAppElement('*');

    const [modalIsOpen, setIsOpen] = useState(false);
    const { loading, error, data } = useQuery(ME_QUERY);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error(error);

        return <p>{error.message}</p>;
    }

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <span onClick={openModal} style={{ cursor: 'pointer' }}>
                <p>Following {data.me.followingUsers.length}</p>
            </span>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modal" style={customStyles}>
                <span className="exit" onClick={closeModal} style={{ cursor: 'pointer' }}>
                    <i className="fa fa-times" aria-hidden></i>
                </span>

                <div className="header"></div>
                <div style={{ marginLeft: '20px' }}>
                    {data.me.followingUsers.map((person: any) => (
                        <div style={{ borderBottom: '1px solid lightGrey', padding: '5px' }} key={person.id}>
                            <div className="tweet-header">
                                {person.avatar ? (
                                    <img
                                        src={person.avatar}
                                        style={{ width: '40px', borderRadius: '50%' }}
                                        alt="avatar"
                                    />
                                ) : (
                                    <i className="fa fa-user fa-2x" aria-hidden="true"></i>
                                )}

                                <Link to={`/user/${person.followId}`} replace>
                                    <h4 className="name">{person.name}</h4>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Modal>
        </div>
    );
}
