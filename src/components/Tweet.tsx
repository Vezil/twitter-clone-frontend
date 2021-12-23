import { useMutation } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import Modal from 'react-modal';
import { ME_QUERY } from '../gql/queries';
import { CREATE_TWEET_MUTATION } from '../gql/mutations';
import { customStyles } from '../styles/CustomModalStyles';
import '../styles/tweet.css';

interface TweetValues {
    content: string;
}

export default function Tweet() {
    Modal.setAppElement('*');

    const [createTweet] = useMutation(CREATE_TWEET_MUTATION, {
        refetchQueries: [{ query: ME_QUERY }]
    });

    const [modalIsOpen, setIsOpen] = useState(false);

    const initialValues: TweetValues = {
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
            <button style={{ marginRight: '10px', marginTop: '30px' }} onClick={openModal}>
                <span style={{ padding: '15px 70px 15px 70px' }}>Tweet</span>
            </button>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modal" style={customStyles}>
                <span className="exit" onClick={closeModal}>
                    <i className="fa fa-times" aria-hidden></i>
                </span>

                <div className="header"></div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);

                        await createTweet({
                            variables: values
                        });

                        setSubmitting(false);

                        closeModal();
                    }}
                >
                    <Form>
                        <Field name="content" type="text" as="textarea" placeholder="What's happening..." />
                        <ErrorMessage name="content" component={'div'} />

                        <div className="footer"></div>

                        <button type="submit" className="tweet-button">
                            <span>Tweet</span>
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    );
}
