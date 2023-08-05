import { Fragment, useEffect } from 'react';
import { fetchSortedPosts, postsActions } from '../redux/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import { CommentsBlock } from '../components/CommentsBlock';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { TagsBlock } from '../components/TagsBlock';
import { fetchTags } from '../redux/postsSlice';

export const Home = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const userData = useSelector((state) => state.auth.data);
    const { posts, tags } = useSelector((state) => state.posts);
    const { sortBy } = posts;

    const postsLoading = posts.status === 'loading';
    const tagsLoading = tags.status === 'loading';

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const sortParam = params.get('sort');

        if (sortParam) {
            dispatch(postsActions.setSortBy(sortParam));
        }

        dispatch(fetchSortedPosts(sortParam || sortBy));
        dispatch(fetchTags());
    }, [dispatch, location.search, sortBy]);

    const handleSortChange = (event, newValue) => {
        dispatch(postsActions.setSortBy(newValue));
        dispatch(fetchSortedPosts(newValue));
        navigate(`/?sort=${newValue}`);
    };

    return (
        <Fragment>
            <Box sx={{ width: '100%', marginBottom: '20px' }}>
                <Tabs
                    value={sortBy}
                    onChange={handleSortChange}
                    textColor='secondary'
                    indicatorColor='secondary'
                    aria-label='secondary tabs example'>
                    <Tab value='new' label='New' />
                    <Tab value='popular' label='Popular' />
                    <Tab value='title' label='Title' />
                </Tabs>
            </Box>
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
                                    imageUrl={
                                        obj.imageUrl
                                            ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}`
                                            : ''
                                    }
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
