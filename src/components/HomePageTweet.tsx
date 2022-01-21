import { useMutation } from '@apollo/client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { TWEETS_QUERY } from '../gql/queries';
import { CREATE_TWEET_MUTATION } from '../gql/mutations';
import '../styles/tweet.css';

interface TweetValues {
    content: string;
}

export default function HomePageTweet() {
    const [createTweet] = useMutation(CREATE_TWEET_MUTATION, {
        refetchQueries: [{ query: TWEETS_QUERY }]
    });

    const initialValues: TweetValues = {
        content: ''
    };

    const validationSchema = Yup.object({
        content: Yup.string()
            .required()
            .min(3, 'Must be more than 2 characters')
            .max(256, 'Must be less than 257 characters')
    });

    return (
        <div className="home-page-tweet">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    setSubmitting(true);

                    await createTweet({
                        variables: values
                    });

                    setSubmitting(false);
                }}
            >
                <Form>
                    <Field name="content" type="text" as="textarea" placeholder="What's happening..." />
                    <ErrorMessage name="content" render={msg => <div className="error-message">{msg}</div>} />

                    <button type="submit" className="home-tweet-button">
                        <span>Tweet</span>
                    </button>
                </Form>
            </Formik>

            <div className="footer" />
        </div>
    );
}
