import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from '../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const { data } = await axios.get('/posts');
    return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});

const initialState = {
    posts: { items: [], status: 'loading' },
    tags: { items: [], status: 'loading' },
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.posts.status = 'loading';
            state.posts.items = [];
        });
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts.status = 'succeeded';
            state.posts.items = action.payload;
        });
        builder.addCase(fetchPosts.rejected, (state) => {
            state.posts.status = 'failed';
            state.posts.items = [];
        });
        builder.addCase(fetchTags.pending, (state) => {
            state.tags.status = 'loading';
            state.tags.items = [];
        });
        builder.addCase(fetchTags.fulfilled, (state, action) => {
            state.tags.status = 'succeeded';
            state.tags.items = action.payload;
        });
        builder.addCase(fetchTags.rejected, (state) => {
            state.tags.status = 'failed';
            state.tags.items = [];
        });
    },
});

export const postsActions = postsSlice.actions;
export default postsSlice;
