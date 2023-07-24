import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import React from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import styles from './Login.module.scss';

export const Login = () => {
    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant='h5'>
                Account Login
            </Typography>
            <TextField
                className={styles.field}
                label='E-Mail'
                error
                helperText='Incorrect e-mail address'
                fullWidth
            />
            <TextField className={styles.field} label='Password' fullWidth />
            <Button size='large' variant='contained' fullWidth>
                Log in
            </Button>
        </Paper>
    );
};
