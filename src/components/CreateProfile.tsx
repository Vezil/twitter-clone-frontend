import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Modal from 'react-modal';
import { ME_QUERY } from '../gql/queries';
import { CREATE_PROFILE_MUTATION } from '../gql/mutations';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { customStyles } from '../styles/CustomModalStyles';

interface ProfileValues {
    bio: string;
    location: string;
    website: string;
    avatar: string;
}

export default function CreateProfile() {
    Modal.setAppElement('*');

    const [createProfile] = useMutation(CREATE_PROFILE_MUTATION, {
        refetchQueries: [{ query: ME_QUERY }]
    });

    const [modalIsOpen, setIsOpen] = useState(false);

    const initialValues: ProfileValues = {
        bio: '',
        location: '',
        website: '',
        avatar: ''
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <button onClick={openModal} className="twitter-button">
                Create Profile
            </button>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modal" style={customStyles}>
                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);

                        await createProfile({
                            variables: values
                        });

                        setSubmitting(false);

                        closeModal();
                    }}
                >
                    <Form>
                        <Field
                            name="bio"
                            type="text"
                            as="textarea"
                            placeholder="Bio"
                            style={{ marginBottom: '25px' }}
                        />
                        <ErrorMessage name="bio" render={msg => <div className="error-message">{msg}</div>} />

                        <Field name="location" type="location" placeholder="Location" />
                        <ErrorMessage name="location" render={msg => <div className="error-message">{msg}</div>} />

                        <Field name="website" type="website" placeholder="Website" />
                        <ErrorMessage name="website" render={msg => <div className="error-message">{msg}</div>} />

                        <button type="submit" className="login-register-button">
                            <span>Create Profile</span>
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    );
}
