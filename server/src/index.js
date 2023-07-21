import express from 'express';
import mongoose from 'mongoose';
import { register, login, getMe } from './controllers/UserController.js';

import registerValidation from './validations/loginValidation.js';
import loginValidation from './validations/loginValidation.js';
import checkAuth from './utils/checkAuth.js';

const mongoDBURL =
    'mongodb+srv://jackal7819:31563156Qaz@blog.zprrjlj.mongodb.net/blog?retryWrites=true&w=majority';

mongoose
    .connect(mongoDBURL)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('Error connecting', error));

const app = express();

app.use(express.json());

app.post('/auth/login', loginValidation, login);

app.post('/auth/register', registerValidation, register);

app.get('/auth/me', checkAuth, getMe);

app.listen(5555, () => {
    console.log('Server is running on port 5555');
});
