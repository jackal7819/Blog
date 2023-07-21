import express from 'express';
import bearerToken from 'express-bearer-token';
import multer from 'multer';
import mongoose from 'mongoose';

import { register, login, getMe } from './controllers/UserController.js';
import { getAll, getOne } from './controllers/PostController.js';
import { create, remove, update } from './controllers/PostController.js';

import registerValidation from './validations/loginValidation.js';
import loginValidation from './validations/loginValidation.js';
import postCreateValidation from './validations/postCreateValidation.js';
import checkAuth from './utils/checkAuth.js';
import handleValidation from './utils/handleValidation.js';

const mongoDBURL =
    'mongodb+srv://jackal7819:31563156Qaz@blog.zprrjlj.mongodb.net/blog?retryWrites=true&w=majority';

mongoose
    .connect(mongoDBURL)
    .then(() => console.log('MongoDB connected'))
    .catch((error) => {
        console.error('Error connecting', error);
        process.exit(1);
    });

const app = express();
app.use(bearerToken());

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'src/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use('/uploads', express.static('src/uploads'));

app.post('/auth/login', loginValidation, handleValidation, login);
app.post('/auth/register', registerValidation, handleValidation, register);
app.get('/auth/me', checkAuth, getMe);

app.post('/upload', checkAuth, upload.single('image'), (req, res) => {
    res.json({ url: `uploads/${req.file.originalname}` });
});

app.get('/posts', getAll);
app.get('/posts/:id', getOne);
app.post('/posts', checkAuth, postCreateValidation, handleValidation, create);
app.delete('/posts/:id', checkAuth, remove);
app.patch(
    '/posts/:id',
    checkAuth,
    postCreateValidation,
    handleValidation,
    update
);

app.listen(5555, () => {
    console.log('Server is running on port 5555');
});
