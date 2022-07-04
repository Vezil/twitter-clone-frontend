import { useMutation, useQuery } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import Modal from 'react-modal';
import * as Yup from 'yup';
import { ME_QUERY } from '../gql/queries';
import { CREATE_COMMENT_MUTATION } from '../gql/mutations';
import { customStyles } from '../styles/CustomModalStyles';
import '../styles/tweet.css';

interface Props {
    tweetContent: string;
    name: string;
    avatar: string;
    id: number;
}

interface CommentProps {
    content: string;
}

export default function CreateComment({ tweetContent, avatar, name, id }: Props) {
    Modal.setAppElement('*');

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        refetchQueries: [{ query: ME_QUERY }]
    });

    const [modalIsOpen, setIsOpen] = useState(false);

    const { loading, error, data } = useQuery(ME_QUERY);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error(error);

        return <p>{error.message}</p>;
    }

    const initialValues: CommentProps = {
        content: ''
    };

    const validationSchema = Yup.object({
        content: Yup.string()
            .required()
            .min(3, 'Must be more than 2 characters')
            .max(256, 'Must be less than 257 characters')
    });

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <span onClick={openModal} className="interaction-icon">
                <i className="far fa-comment" aria-hidden="true"></i>
            </span>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modal" style={customStyles}>
                <span className="exit" onClick={closeModal} style={{ cursor: 'pointer' }}>
                    <i className="fa fa-times" aria-hidden></i>
                </span>

                <div className="header"></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 8fr', marginTop: '10px' }}>
                    {avatar ? (
                        <img src={avatar} style={{ width: '40px', borderRadius: '50%' }} alt="avatar" />
                    ) : (
                        <i className="fa fa-user fa-2x" aria-hidden="true"></i>
                    )}
                    <h5>{name}</h5>
                </div>

                <p
                    style={{
                        marginLeft: '20px',
                        borderLeft: '1px solid var(--accent)',
                        paddingLeft: '20px',
                        height: '50px',
                        marginTop: 0
                    }}
                >
                    {tweetContent}
                </p>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);

                        await createComment({
                            variables: { ...values, id }
                        });

                        setSubmitting(false);

                        closeModal();
                    }}
                >
                    <Form>
                        {data.me?.profile?.avatar ? (
                            <img
                                src={data.me.profile.avatar}
                                style={{ width: '40px', borderRadius: '50%' }}
                                alt="avatar"
                            />
                        ) : (
                            <i
                                className="fa fa-user fa-2x"
                                aria-hidden="true"
                                style={{
                                    marginBottom: '6px'
                                }}
                            ></i>
                        )}

                        <Field name="content" type="text" as="textarea" placeholder="Tweet your reply..." />
                        <ErrorMessage
                            name="content"
                            render={(msg: string) => <div className="error-message">{msg}</div>}
                        />

                        <div className="footer"></div>

                        <button type="submit" className="tweet-button">
                            <span>Reply</span>
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    );
}
