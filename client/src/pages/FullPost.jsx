import { useEffect, useState } from 'react';

import { CommentsBlock } from '../components/CommentsBlock';
import { Index } from '../components/AddComment';
import { Post } from '../components/Post';
import ReactMarkdown from 'react-markdown';
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
                imageUrl={
                    data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ''
                }
                user={data.user}
                createdAt={new Date(data.createdAt).toLocaleString()}
                viewsCount={data.viewsCount}
                commentsCount={3}
                tags={data.tags}
                isEditable
                isFullPost>
                <ReactMarkdown children={data.text} />
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
