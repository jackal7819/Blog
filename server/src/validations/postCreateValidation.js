import { body } from 'express-validator';

const postCreateValidation = [
    body('title', 'Enter the title of the article').isLength({min:3}).isString(),
    body('text', 'Enter the text of the article').isLength({ min: 10 }).isString(),
    body('tags', 'Incorrect tag format').optional().isString(),
    body('avatarUrl', 'Invalid link to the image').optional().isURL(),
];

export default postCreateValidation;