import { AddPost, FullPost, Home, Login, Registration } from './pages';
import { Fragment, useEffect } from 'react';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { fetchAuthMe, handlerAuth } from './redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Container } from '@mui/material';
import { Header } from './components/Header';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Fragment>
                <Header />
                <Container maxWidth='lg'>
                    <Outlet />
                </Container>
            </Fragment>
        ),
        children: [
            { index: true, element: <Home /> },
            { path: 'posts/:id', element: <FullPost /> },
            { path: 'add-post', element: <AddPost /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Registration /> },
        ],
    },
]);

const App = () => {
    const dispatch = useDispatch();
    const auth = useSelector(handlerAuth);

    useEffect(() => {
        dispatch(fetchAuthMe())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return <RouterProvider router={router} />;
};

export default App;
