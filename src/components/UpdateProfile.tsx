import { useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Modal from 'react-modal';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { ME_QUERY } from '../gql/queries';
import { UPDATE_PROFILE_MUTATION } from '../gql/mutations';
import { customStyles } from '../styles/CustomModalStyles';

interface ProfileValues {
    id: number;
    bio: string;
    location: string;
    website: string;
    avatar: string;
}

export default function UpdateProfile() {
    Modal.setAppElement('*');

    const inputFile = useRef<HTMLInputElement | null>(null);

    const [image, setImage] = useState('');
    const [imageLoading, setImageLoading] = useState(false);

    const { loading, error, data } = useQuery(ME_QUERY);

    const [updateProfile] = useMutation(UPDATE_PROFILE_MUTATION, {
        refetchQueries: [{ query: ME_QUERY }]
    });

    const [modalIsOpen, setIsOpen] = useState(false);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error(error);

        return <p>{error.message}</p>;
    }

    const initialValues: ProfileValues = {
        id: data.me.profile.id,
        bio: data.me.profile.bio,
        location: data.me.profile.location,
        website: data.me.profile.website,
        avatar: data.me.profile.avatar
    };

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    const uploadImage = async (event: any) => {
        const { files } = event.target;
        const formData = new FormData();

        formData.append('file', files[0]);
        formData.append('upload_preset', 'lcsfzkuk');

        setImageLoading(true);

        const response = await fetch(process.env.REACT_APP_CLOUDINARY_API_URL as string, {
            method: 'POST',
            body: formData
        });

        const { secure_url } = await response.json();

        setImage(secure_url);

        setImageLoading(false);
    };

    return (
        <div>
            <button onClick={openModal} className="twitter-button">
                Edit Profile
            </button>

            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Modal" style={customStyles}>
                <input
                    type="file"
                    name="file"
                    placeholder="Upload file"
                    onChange={uploadImage}
                    ref={inputFile}
                    style={{ display: 'none' }}
                />

                {imageLoading ? (
                    <h3>Loading...</h3>
                ) : (
                    <>
                        {image ? (
                            <div onClick={() => inputFile?.current?.click()} className="profile-icon">
                                <img src={image} style={{ width: '150px', borderRadius: '50%' }} alt="avatar" />
                            </div>
                        ) : (
                            <div onClick={() => inputFile?.current?.click()} className="profile-icon">
                                <i className="fa fa-user fa-5x" aria-hidden="true"></i>
                            </div>
                        )}
                    </>
                )}

                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);

                        await updateProfile({
                            variables: { ...values, avatar: image }
                        });

                        setSubmitting(false);

                        closeModal();
                    }}
                >
                    <Form>
                        <Field name="bio" type="text" as="textarea" placeholder="Bio" />
                        <ErrorMessage name="bio" render={msg => <div className="error-message">{msg}</div>} />

                        <Field name="location" type="location" placeholder="Location" />
                        <ErrorMessage name="location" render={msg => <div className="error-message">{msg}</div>} />

                        <Field name="website" type="website" placeholder="Website" />
                        <ErrorMessage name="website" render={msg => <div className="error-message">{msg}</div>} />

                        <button type="submit" className="login-register-button">
                            <span>Update Profile</span>
                        </button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    );
}
