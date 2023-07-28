import { Fragment, useEffect } from 'react';
import { fetchPosts, fetchTags } from '../redux/postsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { CommentsBlock } from '../components/CommentsBlock';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { TagsBlock } from '../components/TagsBlock';

export const Home = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.auth.data);
    const { posts, tags } = useSelector((state) => state.posts);

    const postsLoading = posts.status === 'loading';
    const tagsLoading = tags.status === 'loading';

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchTags());
    }, [dispatch]);

    console.log(userData?._id);

    return (
        <Fragment>
            <Tabs
                style={{ marginBottom: 15 }}
                value={0}
                aria-label='basic tabs example'>
                <Tab label='New' />
                <Tab label='Popular' />
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {(postsLoading ? [...Array(4)] : posts.items).map(
                        (obj, index) =>
                            postsLoading ? (
                                <Post key={index} isLoading={true} />
                            ) : (
                                <Post
                                    _id={obj._id}
                                    key={obj._id}
                                    title={obj.title}
                                    imageUrl={obj.imageUrl}
                                    // imageUrl='https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png'
                                    user={obj.user}
                                    createdAt={new Date(
                                        obj.createdAt
                                    ).toLocaleString()}
                                    viewsCount={obj.viewsCount}
                                    commentsCount={3}
                                    tags={obj.tags}
                                    isEditable={userData?._id === obj.user._id}
                                />
                            )
                    )}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={tags.items} isLoading={tagsLoading} />
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
                        isLoading={false}
                    />
                </Grid>
            </Grid>
        </Fragment>
    );
};
