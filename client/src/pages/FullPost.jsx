import React, { useEffect, useState } from 'react';

import { CommentsBlock } from '../components/CommentsBlock';
import { Index } from '../components/AddComment';
import { Post } from '../components/Post';
import axios from '../axios';
import { useParams } from 'react-router-dom';

export const FullPost = () => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/posts/${id}`);

                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error when receiving an article');
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <Post isLoading={loading} isFullPost />;
    }

    return (
        <>
            <Post
                _id={data._id}
                key={data._id}
                title={data.title}
                imageUrl={data.imageUrl}
                // imageUrl='https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png'
                user={data.user}
                createdAt={new Date(data.createdAt).toLocaleString()}
                viewsCount={data.viewsCount}
                commentsCount={3}
                tags={data.tags}
                isEditable
                isFullPost>
                <p>{data.text}</p>
            </Post>
            <CommentsBlock
                items={[
                    {
                        user: {
                            fullName: 'John Smith',
                            avatarUrl:
                                'https://mui.com/static/images/avatar/1.jpg',
                        },
                        text: 'This is a test comment',
                    },
                    {
                        user: {
                            fullName: 'Alex Brin',
                            avatarUrl:
                                'https://mui.com/static/images/avatar/2.jpg',
                        },
                        text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                    },
                ]}
                isLoading={false}>
                <Index />
            </CommentsBlock>
        </>
    );
};
