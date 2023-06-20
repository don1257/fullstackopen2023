import {createSlice} from "@reduxjs/toolkit";

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        setBlog: (state, action) => {
            const blogObject = action.payload;
            return blogObject
        },
        deleteBlog: (state, action) => {
            let blogId = action.payload;
            blogId = blogId.id
            return state.filter(blog => blog.id !== blogId);
        },
        upvoteBlog: (state, action) => {
            const blogId = action.payload.id;
            return state.map(blog => {
                if (blog.id === blogId && blog.likes >= 1) {
                    return { ...blog, likes: blog.likes + 1 };
                }
                if (blog.id === blogId && blog.likes == null) {
                    return { ...blog, likes: 1 };
                }
                return blog;
            });
        }
    }
})

export const { setBlog, deleteBlog, upvoteBlog } = blogSlice.actions;
export default blogSlice.reducer
