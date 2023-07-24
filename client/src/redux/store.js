import { configureStore } from '@reduxjs/toolkit';
import postsSlice from './postsSlice';

const store = configureStore({
    reducer: {
        posts: postsSlice.reducer,
    },
});

export default store;
