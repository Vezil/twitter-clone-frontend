import React from 'react';
import { useQuery } from '@apollo/client';
import { Navigate } from 'react-router-dom';
import { IS_LOGGED_IN } from '../gql/queries';

interface Props {
    children?: React.ReactNode;
}

export default function IsAuthenticated({ children }: Props) {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error(error);

        return <Navigate to={{ pathname: '/landing' }} />;
    }

    if (!data.me) {
        return <Navigate to={{ pathname: '/landing' }} />;
    }

    return <>{children}</>;
}
