import { useQuery } from '@apollo/client';
import { USERS_QUERY } from '../gql/queries';

interface User {
    id: string;
    name: string;
}

export default function Users() {
    const { loading, error, data } = useQuery(USERS_QUERY);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        console.error(error);

        return <p>{error.message}</p>;
    }

    return (
        <div>
            {data.users.map((user: User) => (
                <p key={user.id}>{user.name}</p>
            ))}
        </div>
    );
}
