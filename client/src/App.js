import { AddPost, FullPost, Home, Login, Registration } from './pages';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Container } from '@mui/material';
import { Fragment } from 'react';
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
    return <RouterProvider router={router} />;
};

export default App;
