import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if (token) {

    } else {
        res.status(403).json({message: 'Access Denied'})
    }

    res.send(token);
};

export default checkAuth;
