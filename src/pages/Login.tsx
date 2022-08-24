import { useMutation } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import * as Yup from 'yup';
import { LOGIN_MUTATION } from '../gql/mutations';
import TwitterLogo from '../styles/assets/twitter-logo.png';
import '../styles/login-register.css';

interface LoginValues {
    email: string;
    password: string;
}

export default function Login() {
    const navigate = useNavigate();
    const [login] = useMutation(LOGIN_MUTATION);

    let [isErrorFromServer, setIsError] = useState(false);

    const initialValues: LoginValues = {
        email: '',
        password: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email required'),
        password: Yup.string().max(20, 'Must be 20 characters or less').required('Password required')
    });

    const setIsErrorFromServer = (value: boolean) => {
        setIsError(value);
    };

    return (
        <div className="container">
            <img src={TwitterLogo} alt="logo" style={{ width: '50px' }} className="logo" />
            <h3>Log in to Fake Twitter</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);

                    let token = null;

                    try {
                        const { data } = await login({
                            variables: values
                        });

                        setIsErrorFromServer(false);

                        token = data.login.token;
                    } catch (error) {
                        setIsErrorFromServer(true);

                        console.error(error);
                    }

                    if (token) {
                        localStorage.setItem('token', token);

                        setSubmitting(false);

                        navigate('/');
                    }
                }}
            >
                <Form>
                    <Field name="email" type="text" placeholder="Email" />
                    <ErrorMessage
                        name="email"
                        render={msg => (
                            <div className="login-register-error-message">
                                {msg}
                            </div>
                        )}
                    />

                    <Field name="password" type="password" placeholder="Password" />
                    <ErrorMessage
                        name="password"
                        render={msg => (
                            <div className="login-register-error-message">
                                {msg}
                            </div>
                        )}
                    />

                    {isErrorFromServer ? (
                        <div className="login-register-error-message">
                            Your credentails are incorrect
                        </div>
                    ) : null}

                    <button type="submit" className="login-register-button">
                        <span>Login</span>
                    </button>
                </Form>
            </Formik>

            <div className="register">
                <h4>Don't have an account?</h4>
                <Link to="/signup" replace>
                    Sign up
                </Link>
            </div>
        </div>
    );
}
