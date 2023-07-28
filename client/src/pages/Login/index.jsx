import { fetchAuth, handlerAuth } from '../../redux/authSlice';
import { useDispatch, useSelector } from 'react-redux';

import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import styles from './Login.module.scss';
import { useForm } from 'react-hook-form';

export const Login = () => {
    const isAuth = useSelector(handlerAuth);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
    try {
        const { payload, error } = await dispatch(fetchAuth(values));

        if (error) {
            setError('email', { message: 'Invalid email or password' });
        } else if ('token' in payload) {
            window.localStorage.setItem('token', payload.token);
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        setError('email', { message: 'An error occurred during authentication' });
    }
};

    if (isAuth) {
        return <Navigate to='/' />;
    }

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant='h5'>
                Account Login
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label='E-Mail'
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {
                        required: 'Enter your email',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                        },
                    })}
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    label='Password'
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', {
                        required: 'Enter your password',
                    })}
                    fullWidth
                />
                <Button
                    disabled={!isValid}
                    type='submit'
                    size='large'
                    variant='contained'
                    fullWidth>
                    Login
                </Button>
            </form>
        </Paper>
    );
};
