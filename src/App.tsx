import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { setContext } from 'apollo-link-context';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import IsAuthenticated from './components/IsAuthenticated';
import Home from './pages/Home';
import SingleTweet from './pages/SingleTweet';
import SingleUser from './pages/SingleUser';
import Users from './components/Users';
import LandingPage from './components/LandingPage';
import './App.css';

require('dotenv').config();

const httpLink = new HttpLink({
    uri: process.env.REACT_APP_API_URL
});

const authLink = setContext(async (req, { headers }) => {
    const token = localStorage.getItem('token');

    return {
        ...headers,
        headers: {
            Authorization: token ? `Bearer ${token}` : null
        }
    };
});

const link = authLink.concat(httpLink as any);

const client = new ApolloClient({
    link: link as any,
    cache: new InMemoryCache()
});

const isLoggedIn = !!window.localStorage.token;

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <IsAuthenticated>
                                <Home />
                            </IsAuthenticated>
                        }
                    ></Route>
                    <Route
                        path="/users"
                        element={
                            <IsAuthenticated>
                                <Users />
                            </IsAuthenticated>
                        }
                    ></Route>
                    <Route
                        path="/profile"
                        element={
                            <IsAuthenticated>
                                <Profile />
                            </IsAuthenticated>
                        }
                    ></Route>
                    <Route
                        path="/tweet/:id"
                        element={
                            <IsAuthenticated>
                                <SingleTweet />
                            </IsAuthenticated>
                        }
                    ></Route>
                    <Route
                        path="/user/:id"
                        element={
                            <IsAuthenticated>
                                <SingleUser />
                            </IsAuthenticated>
                        }
                    ></Route>

                    <Route
                        path="/landing"
                        element={isLoggedIn ? <Navigate to={{ pathname: '/' }} /> : <LandingPage />}
                    ></Route>
                    <Route
                        path="/signup"
                        element={isLoggedIn ? <Navigate to={{ pathname: '/' }} /> : <Signup />}
                    ></Route>
                    <Route path="/login" element={isLoggedIn ? <Navigate to={{ pathname: '/' }} /> : <Login />}></Route>
                </Routes>
            </Router>
        </ApolloProvider>
    );
}

export default App;
