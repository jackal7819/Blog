import express from 'express';
import { validationResult } from 'express-validator';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import registerValidation from './validations/auth.js';
import UserModel from './models/User.js';
import checkAuth from './utils/checkAuth.js';

mongoose
    .connect(
        'mongodb+srv://jackal7819:31563156Qaz@blog.zprrjlj.mongodb.net/blog?retryWrites=true&w=majority'
    )
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log('Error connecting', error));

const app = express();

app.use(express.json());

app.post('/auth/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isValidPass = await bcrypt.compare(
            req.body.password,
            user._doc.passwordHash
        );

        if (!isValidPass) {
            return res.status(400).json({ message: 'Wrong login or password' });
        }

        const token = jwt.sign({ id: user._id }, 'secret123', {
            expiresIn: '30d',
        });

        const { passwordHash, ...userData } = user._doc;

        res.json({ ...userData, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to log in' });
    }
});

app.post('/auth/register', registerValidation, async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            avatarUrl: req.body.avatarUrl,
            passwordHash: hash,
        });

        const user = await doc.save();

        const token = jwt.sign({ id: user._id }, 'secret123', {
            expiresIn: '30d',
        });

        const { passwordHash, ...userData } = user._doc;

        res.json({ ...userData, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to register' });
    }
});

app.get('/auth/me', checkAuth, (req, res) => {
    try {
        res.json({ success: true });
    } catch (error) {}
});

app.listen(5555, () => {
    console.log('Server is running on port 5555');
});
