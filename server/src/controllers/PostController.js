import PostModel from '../models/Post.js';

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get articles' });
    }
};

export const getPostsByNew = async (req, res) => {
    try {
        const posts = await PostModel.find()
            .populate('user')
            .sort({ createdAt: -1 })
            .exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching posts.' });
    }
};

export const getPostsByPopular = async (req, res) => {
    try {
        const posts = await PostModel.find()
            .populate('user')
            .sort({ viewsCount: -1 })
            .exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching posts.' });
    }
};

export const getPostsByTitle = async (req, res) => {
    try {
        const posts = await PostModel.find()
            .populate('user')
            .sort({ title: 1 })
            .exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching posts.' });
    }
};

export const getPostsByTag = async (req, res) => {
    const selectedTag = req.query.tag;

    try {
        const posts = await PostModel.find({ tags: selectedTag })
            .populate('user')
            .sort({ createdAt: -1 })
            .exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching posts.' });
    }
};

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tagsSet = new Set(posts.map((obj) => obj.tags).flat());
        const tags = Array.from(tagsSet).slice(-5);

        res.json(tags);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get tags' });
    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findOneAndUpdate(
            { _id: postId },
            { $inc: { viewsCount: 1 } },
            { new: true }
        ).populate('user');

        if (!doc) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json(doc);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to get the article' });
    }
};

export const create = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            user: req.userId,
            text: req.body.text,
            tags: req.body.tags,
            imageUrl: req.body.imageUrl,
        });

        const post = await doc.save();

        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to create an article' });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        const doc = await PostModel.findOneAndDelete({ _id: postId });

        if (!doc) {
            return res.status(404).json({ message: 'Article not found' });
        }

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to delete the article' });
    }
};

export const update = async (req, res) => {
    try {
        const postId = req.params.id;

        await PostModel.updateOne(
            { _id: postId },
            {
                title: req.body.title,
                user: req.userId,
                text: req.body.text,
                tags: req.body.tags,
                imageUrl: req.body.imageUrl,
            }
        );

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Failed to update the article' });
    }
};
