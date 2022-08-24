import { useMutation } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import * as Yup from 'yup';
import { SIGNUP_MUTATION } from '../gql/mutations';
import TwitterLogo from '../styles/assets/twitter-logo.png';
import '../styles/login-register.css';

interface SignupValues {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}

export default function Signup() {
    const navigate = useNavigate();
    const [signup] = useMutation(SIGNUP_MUTATION);

    const initialValues: SignupValues = {
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    };

    const validationSchema = Yup.object({
        name: Yup.string().max(15, 'Must be 15 characters or less').required(),
        email: Yup.string().email('Invalid email address').required('Email required'),
        password: Yup.string().max(20, 'Must be 20 characters or less').required('Password required'),
        repeatPassword: Yup.string().oneOf([Yup.ref('password')], 'Password not match')
    });

    return (
        <div className="container">
            <img src={TwitterLogo} alt="logo" style={{ width: '50px' }} className="logo" />

            <h3>Sign up</h3>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);

                    const { data } = await signup({
                        variables: values
                    });

                    localStorage.setItem('token', data.signup.token);

                    setSubmitting(false);

                    navigate('/');
                }}
            >
                <Form>
                    <Field name="email" type="text" placeholder="Email" />
                    <ErrorMessage name="email" render={msg => <div className="login-register-error-message">{msg}</div>} />

                    <Field name="name" type="text" placeholder="Name" />
                    <ErrorMessage name="name" render={msg => <div className="login-register-error-message">{msg}</div>} />

                    <Field name="password" type="password" placeholder="Password" />
                    <ErrorMessage name="password" render={msg => <div className="login-register-error-message">{msg}</div>} />

                    <Field name="repeatPassword" type="password" placeholder="Repeat Password" />
                    <ErrorMessage name="repeatPassword" render={msg => <div className="login-register-error-message">{msg}</div>} />

                    <button type="submit" className="login-register-button">
                        <span>Signup</span>
                    </button>
                </Form>
            </Formik>

            <div className="register">
                <h4>Already have an account?</h4>

                <Link to="/login" replace>
                    Log in
                </Link>
            </div>
        </div>
    );
}
